import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `How ${siteConfig.brandName} handles inquiry and website information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section
      eyebrow="Legal"
      title="Privacy Notice"
      description="This MVP notice explains how we handle information submitted through this website. It is not a substitute for legal review before public launch."
    >
      <div className="prose-like max-w-3xl space-y-6 text-sm leading-relaxed text-slate sm:text-base">
        <p>
          <strong className="text-navy">{siteConfig.brandName}</strong>{" "}
          (“we”) operates this website to describe our advisory services and to
          receive qualified inquiries.
        </p>
        <h2 className="text-lg font-semibold text-navy">Information we collect</h2>
        <p>
          When you submit the contact form, we collect the fields you provide
          (such as name, work email, company, job title, service interests,
          program stage, timing, and message), along with technical metadata
          such as submission timestamp, referring page, and campaign parameters
          if present. We do not ask for customer PII, credentials, production
          data, or confidential pricing through the public form.
        </p>
        <h2 className="text-lg font-semibold text-navy">How we use information</h2>
        <p>
          We use inquiry information to respond to your request, assess fit for
          an advisory conversation, and improve our website and conversion
          funnel. If analytics are enabled, we may collect privacy-conscious
          usage events without sending form message text into analytics.
        </p>
        <h2 className="text-lg font-semibold text-navy">Sharing</h2>
        <p>
          We may use a transactional email provider to deliver inquiries to our
          advisory inbox. We do not sell personal information. We may disclose
          information if required by law or to protect rights and safety.
        </p>
        <h2 className="text-lg font-semibold text-navy">Retention</h2>
        <p>
          We retain inquiry records for as long as needed to respond and manage
          potential engagements, then delete or anonymize them according to our
          internal retention practices.
        </p>
        <h2 className="text-lg font-semibold text-navy">Contact</h2>
        <p>
          Privacy questions:{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-teal underline-offset-2 hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
        <p className="text-xs text-slate">
          Last updated: August 6, 2026. This notice will be updated before
          public launch after legal review.
        </p>
      </div>
    </Section>
  );
}
