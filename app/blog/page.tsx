import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBand } from "@/components/CtaBand";
import { InsightsIndex } from "@/components/InsightsIndex";
import { Section } from "@/components/Section";
import { getPublishedInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Practical articles on enterprise AI contact centers, evaluations, voice AI, RFPs, and agentic workflows.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const articles = getPublishedInsights();

  return (
    <>
      <Section
        eyebrow="Blogs"
        title="Practical guidance for enterprise AI decisions"
        description={`Original writing from ${siteConfig.brandName} on RFPs, evaluations, voice AI, commercial design, and production readiness.`}
      >
        {articles.length === 0 ? (
          <div className="rounded-lg border border-dashed border-navy/20 bg-white p-6 sm:p-10">
            <p className="text-base font-semibold text-navy">
              Blogs are coming soon
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">
              Published articles will appear here automatically. Drafts never
              render in production.
            </p>
          </div>
        ) : (
          <Suspense fallback={<p className="text-slate">Loading articles…</p>}>
            <InsightsIndex articles={articles} />
          </Suspense>
        )}
        <p className="mt-8 text-sm text-slate">
          Prefer RSS?{" "}
          <a
            href="/blog/rss.xml"
            className="font-semibold text-teal underline-offset-2 hover:underline"
          >
            Subscribe to the feed
          </a>
        </p>
      </Section>
      <CtaBand
        heading="Discuss your AI program"
        body="Tell us what you are evaluating and where the decision is blocked."
      />
    </>
  );
}
