import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { Section } from "@/components/Section";
import { aboutPage, principalProfiles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Umer Rabbani and Deepak Dutta—MBA-trained operators with technical backgrounds and years of industry experience advising enterprises on AI contact centers, conversational AI, and agentic workflows.",
  alternates: { canonical: "/about" },
};

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function AboutPage() {
  const photoFlags = {
    umer: true,
    deepak: siteConfig.principals.deepak.hasPhoto,
  };

  return (
    <>
      <Section
        eyebrow="About"
        title="Why this advisory practice exists"
        description={aboutPage.jointStatement}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {principalProfiles.map((principal) => {
            const config =
              principal.id === "umer"
                ? siteConfig.principals.umer
                : siteConfig.principals.deepak;
            const hasPhoto = photoFlags[principal.id];

            return (
              <article
                key={principal.id}
                className="rounded-lg border border-navy/10 bg-white p-6 sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {hasPhoto ? (
                    <Image
                      src={config.imageSrc}
                      alt={config.imageAlt}
                      width={128}
                      height={128}
                      className="h-28 w-28 shrink-0 rounded-full object-cover object-top"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-navy text-2xl font-semibold text-white"
                    >
                      {config.initials}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-navy">
                      {principal.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-teal">
                      {principal.title}
                    </p>
                    <a
                      href={principal.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-teal"
                      aria-label={`${principal.name} on LinkedIn`}
                    >
                      <LinkedInIcon className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate sm:text-base">
                  {principal.bio}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-body">
                  {principal.experienceSummary}
                </p>

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-teal">
                  Areas of depth
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {principal.areasOfDepth.map((area) => (
                    <li
                      key={area}
                      className="rounded-md bg-off-white px-3 py-1.5 text-xs font-medium text-navy"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>

      <CtaBand
        heading="Work directly with the principals."
        body="Book an AI readiness call to discuss your program stage and the decision ahead."
      />
    </>
  );
}
