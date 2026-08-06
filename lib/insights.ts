import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import {
  authors,
  formatInsightDate,
  getInsightCategories,
  type InsightAuthorId,
  type InsightFrontMatter,
  type InsightMeta,
} from "@/lib/insights-shared";

export type { InsightAuthorId, InsightFrontMatter, InsightMeta };
export { authors, formatInsightDate, getInsightCategories };

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

export type InsightArticle = InsightMeta & {
  contentHtml: string;
  headings: { id: string; text: string; level: number }[];
};

function readingTimeMinutes(text: string): { minutes: number; words: number } {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 200)) };
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function assertFrontMatter(
  data: Record<string, unknown>,
  filePath: string,
): InsightFrontMatter {
  const required = [
    "title",
    "slug",
    "description",
    "date",
    "author",
    "category",
  ] as const;

  for (const key of required) {
    if (typeof data[key] !== "string" || !String(data[key]).trim()) {
      throw new Error(`Missing front matter "${key}" in ${filePath}`);
    }
  }

  const author = data.author as string;
  if (author !== "umer-rabbani" && author !== "deepak-dutta") {
    throw new Error(`Unknown author "${author}" in ${filePath}`);
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : [];

  return {
    title: String(data.title).trim(),
    slug: String(data.slug).trim(),
    description: String(data.description).trim(),
    date: String(data.date).trim(),
    updated:
      typeof data.updated === "string" ? data.updated.trim() : undefined,
    author,
    category: String(data.category).trim(),
    tags,
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    heroImage:
      typeof data.heroImage === "string" ? data.heroImage.trim() : undefined,
  };
}

function listMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => path.join(CONTENT_DIR, name));
}

function parseFile(filePath: string): {
  meta: InsightMeta;
  body: string;
} {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const front = assertFrontMatter(data as Record<string, unknown>, filePath);
  const { minutes, words } = readingTimeMinutes(content);
  return {
    meta: {
      ...front,
      readingTimeMinutes: minutes,
      wordCount: words,
    },
    body: content,
  };
}

function shouldInclude(meta: InsightMeta, includeDrafts: boolean): boolean {
  if (meta.draft && !includeDrafts) return false;
  return true;
}

export function getAllInsights(options?: {
  includeDrafts?: boolean;
}): InsightMeta[] {
  const includeDrafts = options?.includeDrafts ?? !isProduction();
  return listMarkdownFiles()
    .map((filePath) => parseFile(filePath).meta)
    .filter((meta) => shouldInclude(meta, includeDrafts))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPublishedInsights(): InsightMeta[] {
  return getAllInsights({ includeDrafts: false });
}

export function getInsightBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
): InsightArticle | null {
  const includeDrafts = options?.includeDrafts ?? !isProduction();
  for (const filePath of listMarkdownFiles()) {
    const { meta, body } = parseFile(filePath);
    if (meta.slug !== slug) continue;
    if (!shouldInclude(meta, includeDrafts)) return null;

    const processed = remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .processSync(body);

    const contentHtml = String(processed);
    const headings = [
      ...contentHtml.matchAll(/<h([2-3]) id="([^"]+)">([^<]+)<\/h\1>/g),
    ].map((match) => ({
      level: Number(match[1]),
      id: match[2],
      text: match[3]
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"'),
    }));

    return { ...meta, contentHtml, headings };
  }
  return null;
}

export function getRelatedInsights(
  article: InsightMeta,
  limit = 3,
): InsightMeta[] {
  return getPublishedInsights()
    .filter((item) => item.slug !== article.slug)
    .map((item) => {
      const sharedTags = item.tags.filter((tag) => article.tags.includes(tag));
      const categoryBonus = item.category === article.category ? 2 : 0;
      return { item, score: sharedTags.length + categoryBonus };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || (a.item.date < b.item.date ? 1 : -1))
    .slice(0, limit)
    .map((entry) => entry.item);
}
