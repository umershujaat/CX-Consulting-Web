import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

type PrincipalCardProps = {
  name: string;
  title: string;
  bio: string;
  linkedIn: string;
  imageSrc?: string;
  imageAlt?: string;
  initials: string;
  hasPhoto?: boolean;
  profileHref?: string;
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

export function PrincipalCard({
  name,
  title,
  bio,
  linkedIn,
  imageSrc,
  imageAlt,
  initials,
  hasPhoto = true,
  profileHref = "/about",
}: PrincipalCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        {hasPhoto && imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? `Portrait of ${name}`}
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-full object-cover object-top"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-navy text-xl font-semibold tracking-wide text-white"
          >
            {initials}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-navy">
            {name}
          </h3>
          <p className="mt-1 text-sm font-medium text-teal">{title}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate sm:text-base">
        {bio}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          aria-label={`${name} on LinkedIn`}
        >
          <LinkedInIcon className="h-5 w-5" />
          LinkedIn
        </a>
        <Link
          href={profileHref}
          className="text-sm font-semibold text-teal hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          View full profile
        </Link>
      </div>
    </article>
  );
}

export function PrincipalsFromConfig() {
  const { umer, deepak } = siteConfig.principals;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PrincipalCard
        name={umer.name}
        title={umer.title}
        bio="Umer is a product executive with 13+ years of experience across enterprise SaaS, customer-service AI, voice AI, and cloud contact centers. His experience includes building and scaling platforms at Salesforce, Five9, Genesys, and Uniphore; designing AI evaluation frameworks; and taking enterprise voice and agentic workflows from use-case definition through pilot and production readiness."
        linkedIn={umer.linkedIn}
        imageSrc={umer.imageSrc}
        imageAlt={umer.imageAlt}
        initials={umer.initials}
        hasPhoto
      />
      <PrincipalCard
        name={deepak.name}
        title={deepak.title}
        bio="Deepak is an enterprise product and customer-engagement executive with more than 25 years of experience. At Meta, he worked across Business Messaging, real-time communications, conversational AI, and agentic business experiences supporting interactions at global scale. His experience also includes leading enterprise AI application portfolios and connecting customer experience, messaging, data, and workflow execution."
        linkedIn={deepak.linkedIn}
        imageSrc={deepak.imageSrc}
        imageAlt={deepak.imageAlt}
        initials={deepak.initials}
        hasPhoto={deepak.hasPhoto}
      />
    </div>
  );
}
