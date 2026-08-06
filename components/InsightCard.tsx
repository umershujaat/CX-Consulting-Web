import Link from "next/link";
import {
  authors,
  formatInsightDate,
  type InsightMeta,
} from "@/lib/insights-shared";

type InsightCardProps = {
  article: InsightMeta;
  featured?: boolean;
};

export function InsightCard({ article, featured = false }: InsightCardProps) {
  const author = authors[article.author];

  return (
    <article
      className={`flex h-full flex-col rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-colors hover:border-teal/40 hover:shadow-md sm:p-6 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.12em] text-teal">
        <span>{article.category}</span>
        {featured ? <span className="text-warm">Featured</span> : null}
      </div>
      <h3
        className={`mt-3 font-semibold tracking-tight text-navy ${
          featured ? "text-xl sm:text-2xl" : "text-lg"
        }`}
      >
        <Link
          href={`/blog/${article.slug}`}
          className="hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate sm:text-base">
        {article.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate">
        <span className="font-medium text-navy">{author.name}</span>
        <span aria-hidden>·</span>
        <time dateTime={article.date}>{formatInsightDate(article.date)}</time>
        <span aria-hidden>·</span>
        <span>{article.readingTimeMinutes} min read</span>
      </div>
    </article>
  );
}
