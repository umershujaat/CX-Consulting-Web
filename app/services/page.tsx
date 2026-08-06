import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/Section";
import { DiscussEngagementLink } from "@/components/ServiceCard";
import { servicesDetail } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Buyer-side advisory for AI contact center strategy, vendor selection and RFPs, evaluations, commercial design, agentic architecture, and production readiness.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Section
        eyebrow="Services"
        title="Buyer-side expertise from decision to deployment."
        description="Each engagement answers a concrete business question and produces artifacts your teams can use with vendors, procurement, security, and executives."
      >
        <div className="space-y-12 sm:space-y-16">
          {servicesDetail.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28 border-t border-navy/10 pt-10 first:border-t-0 first:pt-0"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                {service.title}
              </h2>

              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">
                    Questions answered
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate sm:text-base">
                    {service.questions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">
                    Deliverables
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate sm:text-base">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {service.note ? (
                <p className="mt-5 text-sm italic text-slate">{service.note}</p>
              ) : null}

              <div className="mt-6">
                <DiscussEngagementLink slug={service.slug} />
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand
        heading="Ready to discuss an engagement?"
        body={`Tell ${siteConfig.brandName} what you are evaluating and where your program needs support.`}
      />
    </>
  );
}
