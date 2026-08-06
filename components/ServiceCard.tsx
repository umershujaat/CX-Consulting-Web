import Link from "next/link";
import { siteConfig } from "@/lib/site";

type ServiceCardProps = {
  title: string;
  outcome: string;
  href: string;
};

export function ServiceCard({ title, outcome, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-colors hover:border-teal/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:p-6"
    >
      <h3 className="text-base font-semibold tracking-tight text-navy group-hover:text-teal sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate sm:text-base">
        {outcome}
      </p>
      <span className="mt-4 text-sm font-semibold text-teal">
        View service →
      </span>
    </Link>
  );
}

type EngagementCardProps = {
  title: string;
  description: string;
};

export function EngagementCard({ title, description }: EngagementCardProps) {
  return (
    <article className="rounded-lg border border-navy/10 bg-white p-5 sm:p-6">
      <h3 className="text-base font-semibold tracking-tight text-navy sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
        {description}
      </p>
    </article>
  );
}

export function DiscussEngagementLink({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <Link
      href={`/contact?service=${slug}`}
      className={`inline-flex items-center justify-center rounded-md border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${className}`}
    >
      {siteConfig.cta.discussEngagement}
    </Link>
  );
}
