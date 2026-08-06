import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

type CtaBandProps = {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CtaBand({
  heading = "Make your next AI decision defensible.",
  body = "Tell us what you are evaluating, where the program is blocked, and what decision your team needs to make next.",
  ctaLabel = siteConfig.cta.primary,
  ctaHref = "/contact",
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(11,122,117,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(51,184,197,0.2),transparent_50%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
            {body}
          </p>
        </div>
        <Button
          href={ctaHref}
          variant="primary"
          className="shrink-0 bg-cyan text-navy hover:bg-cyan/90 focus-visible:outline-cyan"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
