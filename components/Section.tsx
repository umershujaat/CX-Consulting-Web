import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: "default" | "muted" | "inverse";
};

const toneClasses = {
  default: "bg-white text-body",
  muted: "bg-off-white text-body",
  inverse: "bg-navy text-white",
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  containerClassName = "",
  tone = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${toneClasses[tone]} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {(eyebrow || title || description) && (
          <header className="mb-10 max-w-3xl sm:mb-12">
            {eyebrow ? (
              <p
                className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${
                  tone === "inverse" ? "text-cyan" : "text-teal"
                }`}
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className={`text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl ${
                  tone === "inverse" ? "text-white" : "text-navy"
                }`}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                className={`mt-4 text-base leading-relaxed sm:text-lg ${
                  tone === "inverse" ? "text-white/80" : "text-slate"
                }`}
              >
                {description}
              </p>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
