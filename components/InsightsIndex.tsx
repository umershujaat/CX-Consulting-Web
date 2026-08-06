"use client";

import { useMemo, useState } from "react";
import { InsightCard } from "@/components/InsightCard";
import {
  authors,
  getInsightCategories,
  type InsightMeta,
} from "@/lib/insights-shared";

type InsightsIndexProps = {
  articles: InsightMeta[];
};

export function InsightsIndex({ articles }: InsightsIndexProps) {
  const categories = useMemo(() => getInsightCategories(articles), [articles]);
  const authorIds = useMemo(
    () => [...new Set(articles.map((a) => a.author))],
    [articles],
  );

  const [category, setCategory] = useState("all");
  const [author, setAuthor] = useState("all");

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const categoryOk = category === "all" || article.category === category;
      const authorOk = author === "all" || article.author === author;
      return categoryOk && authorOk;
    });
  }, [articles, category, author]);

  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.slug !== featured?.slug);

  const selectClass =
    "rounded-md border border-navy/15 bg-white px-3 py-2 text-sm text-body focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30";

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-slate">
          {filtered.length} article{filtered.length === 1 ? "" : "s"}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="text-sm text-navy">
            <span className="mb-1.5 block font-medium">Category</span>
            <select
              className={selectClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-navy">
            <span className="mb-1.5 block font-medium">Author</span>
            <select
              className={selectClass}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              <option value="all">All authors</option>
              {authorIds.map((id) => (
                <option key={id} value={id}>
                  {authors[id].name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-navy/20 bg-white p-8 text-slate">
          No articles match these filters.
        </div>
      ) : (
        <>
          {featured ? <InsightCard article={featured} featured /> : null}
          {rest.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {rest.map((article) => (
                <InsightCard key={article.slug} article={article} />
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
