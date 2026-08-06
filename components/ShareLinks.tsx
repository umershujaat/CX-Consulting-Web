type ShareLinksProps = {
  url: string;
  title: string;
};

export function ShareLinks({ url, title }: ShareLinksProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-navy">Share</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.label === "Email" ? undefined : "_blank"}
          rel={link.label === "Email" ? undefined : "noopener noreferrer"}
          className="rounded-md border border-navy/15 px-3 py-1.5 text-sm font-semibold text-navy hover:border-teal hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
