import Image from "next/image";
import type { authors } from "@/lib/insights-shared";

type AuthorCardProps = {
  author: (typeof authors)[keyof typeof authors];
};

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <aside className="rounded-lg border border-navy/10 bg-off-white p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <Image
          src={author.imageSrc}
          alt={author.imageAlt}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover object-top"
        />
        <div>
          <p className="text-base font-semibold text-navy">{author.name}</p>
          <p className="mt-1 text-sm text-slate">{author.title}</p>
          <a
            href={author.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-teal hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            LinkedIn profile
          </a>
        </div>
      </div>
    </aside>
  );
}
