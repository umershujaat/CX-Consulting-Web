type ArticleTocProps = {
  headings: { id: string; text: string; level: number }[];
};

export function ArticleToc({ headings }: ArticleTocProps) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-lg border border-navy/10 bg-off-white p-5"
    >
      <p className="text-sm font-semibold text-navy">On this page</p>
      <ol className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-3" : undefined}
          >
            <a
              href={`#${heading.id}`}
              className="text-sm text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
