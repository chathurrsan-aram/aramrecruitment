# Aram website

Next.js (App Router) static-export site for The Aram Initiative, styled with Tailwind CSS and deployed on Vercel from the default branch.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static export to ./out
npm run lint
```

Copy `.env.example` to `.env.local` for local development. In Vercel the same variables must be set in the project's environment settings:

- `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`: the Apps Script web app URL that receives Join Us applications. Without it the form tells applicants to email instead.
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for the logo images and the research hero clip.

## Structure

- `src/app/` pages: home, about, initiatives (with per-initiative detail pages), research, trip, reports, partners, join, ideas (password-gated Ideas Hub), plus a branded 404
- `src/components/` UI components, initiatives components, the Sri Lanka district map
- `src/data/` site content: initiatives, trip activities, ideas, partners, regions, research markdown
- `src/lib/cloudinary.js` image URL helper and the hero video sources
- `public/images/` self-hosted assets, including the hero clips `hero-home.mp4` and `Git_hero.mp4`
- `public/geo/` district GeoJSON for the map
- `google-apps-script.js` the Apps Script that writes Join Us applications to the recruitment sheet
- `generate-roles-pdf.js` regenerates `public/aram-roles-2026-2027.pdf`, the role descriptions PDF linked from the Join page

## Native members dashboard

`/members` now runs in this Next.js application. It does not redirect to the previous prototype. Anonymous visitors see a fictional read-only fixture, never the private owner's workspace. Login at `/members/login` uses Supabase email links with PKCE; only configured, confirmed owner emails may load or change a saved workspace. Public visitors cannot submit changes.

Apply `docs/members-schema.sql` through Supabase migrations, populate `members_allowed_emails` administratively, and configure the server-only variables listed in `.env.example` in Vercel. Set Supabase Site URL to the canonical `/members` page and allow only canonical `/members/auth/callback` URLs. Do not expose service-role keys or use user metadata for authorization. Optional `members_workspace_imports` seeds an owner's first workspace; it never overwrites subsequent saved edits.

The API checks verified Supabase identity, database RLS, same-origin writes, bounded validated payloads and atomic version comparison. All private data/auth responses bypass shared caches. Deployment uses Next.js server routes, not static export. Run `node --test tests/*.test.mjs`, focused ESLint and `npm run build` before deploying. The old hosted prototype remains a separate private historical version.
