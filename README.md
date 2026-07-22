# Suthang Sukrueangkun — Portfolio

A statically rendered personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Development

Use Node.js 20.9 or newer, then install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` when optional integrations are needed:

```bash
cp .env.example .env.local
```

- `GITHUB_TOKEN` increases the GitHub API rate limit for live repository and commit totals. The public API remains the fallback.
- `GOOGLE_SITE_VERIFICATION` is the `content` value from Google Search Console's HTML-tag verification method.

## Search indexing

The canonical production URL is `https://me.oangsa.com`.

After deploying SEO changes:

1. Add `https://me.oangsa.com/` as a URL-prefix property in [Google Search Console](https://search.google.com/search-console/).
2. Select HTML-tag verification, set its `content` value as the Vercel production environment variable `GOOGLE_SITE_VERIFICATION`, and redeploy.
3. Submit `https://me.oangsa.com/sitemap.xml` in Search Console.
4. Use URL Inspection to request indexing for `/`, `/profile`, and the project pages linked from the home page:
   - `/projects/codetice`
   - `/projects/maintenance-tracking-system`
   - `/projects/inventory-management-system`
   - `/projects/hospital-system`
   - `/projects/treasure-hunt-robot`
   - `/projects/brainrot-interpreter`
   - `/projects/sandwich-bot`
   - `/projects/to-be-number-one-website`
5. Keep the GitHub profile website and this repository's homepage set to `https://me.oangsa.com`.

Google controls crawl timing and ranking; sitemap submission is a discovery signal rather than an indexing guarantee.

Project case studies are statically generated from the verified project data in `utils/data.ts`. Their sitemap `lastModified` values are explicit content dates, so they should be updated only when the published case-study content changes.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Environment variables are optional for local development.
