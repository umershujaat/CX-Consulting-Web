import { siteConfig } from "@/lib/site";

export type InsightAuthorId = "umer-rabbani" | "deepak-dutta";

export type InsightFrontMatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  author: InsightAuthorId;
  category: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  heroImage?: string;
};

export type InsightMeta = InsightFrontMatter & {
  readingTimeMinutes: number;
  wordCount: number;
};

export const authors: Record<
  InsightAuthorId,
  {
    id: InsightAuthorId;
    name: string;
    title: string;
    linkedIn: string;
    imageSrc: string;
    imageAlt: string;
  }
> = {
  "umer-rabbani": {
    id: "umer-rabbani",
    name: siteConfig.principals.umer.name,
    title: siteConfig.principals.umer.title,
    linkedIn: siteConfig.principals.umer.linkedIn,
    imageSrc: siteConfig.principals.umer.imageSrc,
    imageAlt: siteConfig.principals.umer.imageAlt,
  },
  "deepak-dutta": {
    id: "deepak-dutta",
    name: siteConfig.principals.deepak.name,
    title: siteConfig.principals.deepak.title,
    linkedIn: siteConfig.principals.deepak.linkedIn,
    imageSrc: siteConfig.principals.deepak.imageSrc,
    imageAlt: siteConfig.principals.deepak.imageAlt,
  },
};

export function getInsightCategories(articles: InsightMeta[]): string[] {
  return [...new Set(articles.map((a) => a.category))].sort();
}

export function formatInsightDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
