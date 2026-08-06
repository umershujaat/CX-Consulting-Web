import { getPublishedInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const articles = getPublishedInsights();

  const items = articles
    .map((article) => {
      const link = `${base}/blog/${article.slug}`;
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(`${article.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description><![CDATA[${article.description}]]></description>
      <category><![CDATA[${article.category}]]></category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${siteConfig.brandName} Blog]]></title>
    <link>${base}/blog</link>
    <description><![CDATA[${siteConfig.social.description}]]></description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
