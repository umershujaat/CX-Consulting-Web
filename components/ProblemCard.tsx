type ProblemCardProps = {
  title: string;
  description: string;
};

export function ProblemCard({ title, description }: ProblemCardProps) {
  return (
    <article className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-base font-semibold tracking-tight text-navy sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
        {description}
      </p>
    </article>
  );
}
