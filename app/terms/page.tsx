import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Website terms and professional-services disclaimer for ${siteConfig.brandName}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section
      eyebrow="Legal"
      title="Terms of Use"
      description="Basic terms for use of this website and a professional-services disclaimer. Subject to legal review before public launch."
    >
      <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-slate sm:text-base">
        <p>
          By using this website, you agree to these terms. Content is provided
          for general informational purposes about {siteConfig.brandName} and
          its advisory offerings.
        </p>
        <h2 className="text-lg font-semibold text-navy">No professional engagement</h2>
        <p>
          Visiting this site or submitting an inquiry does not create a client
          relationship, engagement letter, or obligation to provide services.
          Any engagement is governed by a separate written agreement.
        </p>
        <h2 className="text-lg font-semibold text-navy">
          Professional-services disclaimer
        </h2>
        <p>
          Advice described on this site is commercial and product-oriented
          advisory support. We are not a law firm, audit firm, certification
          body, or compliance authority. Pricing and contract support is
          advisory and must be reviewed by your legal and procurement teams. We
          do not guarantee ROI, savings, compliance outcomes, accuracy, uptime,
          or production success.
        </p>
        <h2 className="text-lg font-semibold text-navy">Employer references</h2>
        <p>{siteConfig.disclaimer}</p>
        <h2 className="text-lg font-semibold text-navy">Website content</h2>
        <p>
          We strive for accuracy but do not warrant that content is complete or
          current. We may update or remove content at any time. Unauthorized
          scraping, misuse, or attempts to compromise the site are prohibited.
        </p>
        <h2 className="text-lg font-semibold text-navy">Contact</h2>
        <p>
          Questions:{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-teal underline-offset-2 hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
        <p className="text-xs text-slate">
          Last updated: August 6, 2026.
        </p>
      </div>
    </Section>
  );
}
