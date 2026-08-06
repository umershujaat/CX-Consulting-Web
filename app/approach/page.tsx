import type { Metadata } from "next";
import { ApproachSteps } from "@/components/ApproachSteps";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { EvaluationMatrix } from "@/components/EvaluationMatrix";
import { Section } from "@/components/Section";
import {
  approachPage,
  approachSteps,
  evaluationDimensions,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Align, Select, Prove, Scale, and Govern—a modular advisory method for enterprise AI contact centers and agentic workflows.",
  alternates: { canonical: "/approach" },
};

export default function ApproachPage() {
  return (
    <>
      <Section
        eyebrow="Approach"
        title="A practical path from ambition to reliable outcomes."
        description={approachPage.intro}
      >
        <ApproachSteps steps={approachSteps} detailed />
      </Section>

      <Section
        title="Five layers of evidence"
        description="Good decisions require a shared language across business, AI, systems, risk, and economics."
        tone="muted"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {approachPage.metricLayers.map((layer) => (
            <article
              key={layer.title}
              className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6"
            >
              <h3 className="text-base font-semibold text-navy">
                {layer.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {layer.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="What good evidence looks like"
        description="We help teams raise the bar beyond scripted demos."
      >
        <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate sm:text-base">
          {approachPage.goodEvidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-body">
          {approachPage.continuityNote}
        </p>
      </Section>

      <Section
        title="Measure outcomes, not demo performance."
        description="The same evaluation taxonomy supports vendor comparison, pilot acceptance, and production monitoring."
        tone="muted"
      >
        <EvaluationMatrix dimensions={evaluationDimensions} />
        <div className="mt-8">
          <Button href="/contact" variant="primary">
            Discuss your current stage
          </Button>
        </div>
      </Section>

      <CtaBand
        heading="Join at the stage you are in."
        body="Whether you are aligning use cases or preparing for production, we can help make the next decision defensible."
        ctaLabel={siteConfig.cta.primary}
      />
    </>
  );
}
