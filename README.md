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
