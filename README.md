# Aram website

Next.js (App Router) static-export site for The Aram Initiative, styled with Tailwind CSS and deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static export to ./out
npm run lint
```

## Structure

- `src/app/` pages: home, about, initiatives, research, trip, reports, partners, join, ideas (password-gated Ideas Hub)
- `src/components/` UI components, initiatives and trip components, Sri Lanka map
- `src/data/` site content (initiatives, ideas, partners, regions, research markdown)
- `src/lib/cloudinary.js` video and image URLs served from Cloudinary
- `google-apps-script.js` Apps Script backing the Join Us application form
