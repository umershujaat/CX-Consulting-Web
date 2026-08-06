import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book an AI readiness call with CX AI Advisors. Tell us what you are evaluating and where your program needs support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Book an AI Readiness Call"
      description="Share what you are evaluating, where the program is blocked, and what decision your team needs to make next. Do not include credentials, customer PII, confidential pricing, or other sensitive materials."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div className="relative">
          <Suspense
            fallback={
              <p className="text-sm text-slate">Loading contact form…</p>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
        <aside className="rounded-lg border border-navy/10 bg-off-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight text-navy">
            What happens next
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate">
            <li>We review your inquiry and confirm fit for an advisory conversation.</li>
            <li>
              You receive a response from{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-medium text-teal underline-offset-2 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </li>
            <li>
              If a scheduling link is configured, you can book a time after
              submitting.
            </li>
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-slate">
            {siteConfig.positioning}
          </p>
        </aside>
      </div>
    </Section>
  );
}
