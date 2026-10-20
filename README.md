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

## Members prototype

`/members` temporarily redirects to the existing private Aram impact prototype:
https://aram-impact-studio.feycalf10.chatgpt.site/ . Vercel handles this in
`vercel.json`, so the public website remains a static export.

The destination retains its ChatGPT sign-in, owner-only access and persisted
demo workspace. No access token, member data or backend credential is included
in this public repository. This entry point does not create public member
accounts or move the application/database into Vercel. Financial and impact
figures in the prototype remain demonstration data.

The redirect is temporary (307), allowing `/members` to become a native member
area later without a permanently cached redirect. A full member rollout needs
member/admin authentication and server-side storage integrated before replacing
this entry point. Existing routes and the Ideas Hub are unchanged.
