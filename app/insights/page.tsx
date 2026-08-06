import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/Section";
import { insightSeedTitles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical insights on enterprise AI contact centers, evaluations, voice AI, and agentic workflows—coming soon.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <Section
        eyebrow="Insights"
        title="Insights are coming soon"
        description="We will publish original, practical articles here. Empty or fabricated posts will never appear on this site."
      >
        <div className="rounded-lg border border-dashed border-navy/20 bg-white p-6 sm:p-10">
          <p className="text-base leading-relaxed text-slate sm:text-lg">
            Topics in preparation for {siteConfig.brandName}:
          </p>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm text-body sm:text-base">
            {insightSeedTitles.map((title) => (
              <li key={title} className="pl-1">
                {title}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-slate">
            Prefer a conversation now?{" "}
            <a
              href="/contact"
              className="font-semibold text-teal underline-offset-2 hover:underline"
            >
              {siteConfig.cta.article}
            </a>
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
