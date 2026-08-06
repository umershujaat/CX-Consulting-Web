import Link from "next/link";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
        The page you requested is not available. Return home or contact{" "}
        {siteConfig.brandName} to discuss your AI program.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" variant="primary">
          Back to home
        </Button>
        <Button href="/contact" variant="secondary">
          {siteConfig.cta.primary}
        </Button>
      </div>
      <p className="mt-8 text-sm text-slate">
        Or browse{" "}
        <Link href="/services" className="font-semibold text-teal hover:underline">
          Services
        </Link>
        ,{" "}
        <Link href="/approach" className="font-semibold text-teal hover:underline">
          Approach
        </Link>
        , or{" "}
        <Link href="/about" className="font-semibold text-teal hover:underline">
          About
        </Link>
        .
      </p>
    </div>
  );
}
