# CX AI Advisors

Enterprise advisory website for AI contact centers, conversational AI, and agentic workflows. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

Working brand name lives in `lib/site.ts` so it can be changed in one place.

## Publishing blogs

Add a Markdown file under `content/insights/` with front matter:

```yaml
title: "Article title"
slug: "article-slug"
description: "Search and social summary"
date: "2026-08-06"
updated: "2026-08-06"
author: "umer-rabbani" # or deepak-dutta
category: "AI Evaluations"
tags:
  - "Voice AI"
featured: false
draft: true
```

- Set `draft: false` to publish.
- Drafts never appear in production builds, sitemap, or RSS.
- Index: `/blog` (`/insights` redirects here)
- Article: `/blog/[slug]`
- RSS: `/blog/rss.xml`

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment variables

See `.env.example`. Key variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata/sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email shown in the UI |
| `NEXT_PUBLIC_SCHEDULING_URL` | Optional post-submit scheduling link |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Optional analytics toggle/domain |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Server-side inbox addresses |
| `EMAIL_PROVIDER_API_KEY` | When unset, contact API mocks delivery in development |

Never commit `.env` or production secrets. Configure CapRover env vars in the CapRover dashboard.

## Content editing

- Brand, navigation, CTAs, LinkedIn URLs: `lib/site.ts`
- Marketing copy (problems, services, approach, about, insight seeds): `lib/content.ts`
- Blog publishing: add Markdown under `content/insights/` and set `draft: false`.

## Docker (local production image)

Container listens on port **3000**.

```bash
docker build -t cx-consulting-web .
docker run --rm -p 3000:3000 cx-consulting-web
curl http://localhost:3000/api/health
```

Expected health response: `{ "status": "ok" }`.

## CapRover

- `captain-definition` points at `./Dockerfile` (do not rename/remove).
- Set CapRover HTTP port to **3000**.
- Configure environment variables listed above in CapRover.
- Deploy via the existing GitHub → CapRover webhook after pushing to the tracked branch.

## Project structure (MVP)

```text
app/           # Routes, layout, API handlers
components/    # Shared UI
lib/           # Site config and content
public/images/ # Principal photos
```
