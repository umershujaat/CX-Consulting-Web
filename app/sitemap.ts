import type { MetadataRoute } from "next";
import { getPublishedInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

const routes = [
  "/",
  "/services",
  "/approach",
  "/about",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const lastModified = new Date();

  const staticEntries = routes.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: (path === "/" || path === "/insights"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority: path === "/" ? 1 : path === "/insights" ? 0.8 : 0.7,
  }));

  const articleEntries = getPublishedInsights().map((article) => ({
    url: `${base}/insights/${article.slug}`,
    lastModified: new Date(`${article.updated ?? article.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
