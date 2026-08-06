import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleToc } from "@/components/ArticleToc";
import { AuthorCard } from "@/components/AuthorCard";
import { Button } from "@/components/Button";
import { InsightCard } from "@/components/InsightCard";
import { ShareLinks } from "@/components/ShareLinks";
import {
  authors,
  formatInsightDate,
  getInsightBySlug,
  getPublishedInsights,
  getRelatedInsights,
} from "@/lib/insights";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedInsights().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug, { includeDrafts: false });
  if (!article) return { title: "Insight not found" };

  const url = `${siteConfig.siteUrl.replace(/\/$/, "")}/insights/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [authors[article.author].name],
      tags: article.tags,
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug, { includeDrafts: false });
  if (!article) notFound();

  const author = authors[article.author];
  const related = getRelatedInsights(article);
  const pageUrl = `${siteConfig.siteUrl.replace(/\/$/, "")}/insights/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.linkedIn,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: pageUrl,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${siteConfig.siteUrl.replace(/\/$/, "")}/insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <article className="pb-16 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <header className="border-b border-navy/10 bg-off-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
            <Link href="/insights" className="hover:text-navy">
              Insights
            </Link>
            <span aria-hidden> / </span>
            {article.category}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
            {article.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate">
            <span className="font-medium text-navy">{author.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>
              {formatInsightDate(article.date)}
            </time>
            <span aria-hidden>·</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:px-8 lg:py-14">
        <div>
          <div
            className="insight-prose"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
          <div className="mt-10 space-y-6 border-t border-navy/10 pt-8">
            <ShareLinks url={pageUrl} title={article.title} />
            <AuthorCard author={author} />
            <div className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6">
              <p className="text-base font-semibold text-navy">
                {siteConfig.cta.article}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Tell us what you are evaluating and where the program is blocked.
              </p>
              <div className="mt-4">
                <Button href="/contact" variant="primary">
                  {siteConfig.cta.primary}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <ArticleToc headings={article.headings} />
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-navy/10 bg-off-white py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-navy">
              Related insights
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <InsightCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
