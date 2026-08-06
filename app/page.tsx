import type { Metadata } from "next";
import { ApproachSteps } from "@/components/ApproachSteps";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { EvaluationMatrix } from "@/components/EvaluationMatrix";
import { PrincipalsFromConfig } from "@/components/PrincipalCard";
import { ProblemCard } from "@/components/ProblemCard";
import { Section } from "@/components/Section";
import {
  EngagementCard,
  ServiceCard,
} from "@/components/ServiceCard";
import {
  approachSteps,
  engagementModels,
  engagementNote,
  evaluationDimensions,
  insightSeedTitles,
  problems,
  servicesSummary,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.social.title,
  },
  description: siteConfig.social.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(11,122,117,0.45),transparent_50%),radial-gradient(ellipse_at_90%_20%,rgba(51,184,197,0.28),transparent_45%),linear-gradient(180deg,rgba(11,31,51,0.2),rgba(11,31,51,0.85))]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-cyan/20 motion-safe:animate-[pulse_8s_ease-in-out_infinite]"
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
            {siteConfig.heroEyebrow}
          </p>
          <p className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {siteConfig.brandName}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-2xl font-semibold tracking-tight text-white/95 sm:text-3xl lg:text-4xl">
            {siteConfig.corePromise}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {siteConfig.heroBody}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href="/contact"
              variant="primary"
              className="bg-cyan text-navy hover:bg-cyan/90 focus-visible:outline-cyan"
            >
              {siteConfig.cta.primary}
            </Button>
            <Button
              href="/services"
              variant="secondary"
              className="border-white/30 text-white hover:border-cyan hover:text-cyan"
            >
              {siteConfig.cta.secondary}
            </Button>
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-white/70">
            {siteConfig.credibilityLine}
          </p>
        </div>
      </section>

      <Section
        title="Enterprise AI decisions are being made faster than they can be proven."
        description="AI contact-center and agentic-platform decisions combine business process, model behavior, real-time infrastructure, enterprise integrations, security, and unfamiliar pricing models. A strong demo is not evidence that a system will perform reliably in production."
        tone="muted"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <ProblemCard
              key={problem.title}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </div>
      </Section>

      <Section
        id="services"
        title="Buyer-side expertise from decision to deployment."
        description="Six focused offerings that help enterprise teams move from ambition to production with evidence."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicesSummary.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              outcome={service.outcome}
              href={`/services#${service.slug}`}
            />
          ))}
        </div>
      </Section>

      <Section
        title="A practical path from ambition to reliable outcomes."
        tone="muted"
      >
        <ApproachSteps steps={approachSteps} />
      </Section>

      <Section
        title="Measure outcomes, not demo performance."
        description="We help teams convert business intent into an evaluation system that can test vendors, approve pilots, and monitor production. The rubric connects customer outcomes with AI behavior, system performance, risk, and economics."
      >
        <EvaluationMatrix dimensions={evaluationDimensions} />
        <div className="mt-8">
          <Button href="/approach" variant="secondary">
            {siteConfig.cta.evaluation}
          </Button>
        </div>
      </Section>

      <Section
        title="Senior operators, directly involved."
        description="Advice is delivered by principals—not handed to a junior delivery team."
        tone="muted"
      >
        <PrincipalsFromConfig />
      </Section>

      <Section title="Focused support for the decision in front of you.">
        <div className="grid gap-4 sm:grid-cols-2">
          {engagementModels.map((model) => (
            <EngagementCard
              key={model.title}
              title={model.title}
              description={model.description}
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-slate">{engagementNote}</p>
      </Section>

      <Section
        title="Insights"
        description="Practical writing on RFPs, evaluations, voice AI, and production readiness is on the way."
        tone="muted"
      >
        <div className="rounded-lg border border-dashed border-navy/20 bg-white p-6 sm:p-8">
          <p className="text-base font-semibold text-navy">
            Insights are coming soon
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
            We will publish original articles here. Until then, here are topics
            we are preparing—not published pieces:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate">
            {insightSeedTitles.slice(0, 3).map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
          <p className="mt-6">
            <Button href="/insights" variant="ghost">
              Visit Insights
            </Button>
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
