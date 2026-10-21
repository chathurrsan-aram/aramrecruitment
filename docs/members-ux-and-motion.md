# Members UX and motion pass

The public dashboard separates Guest browsing, local initiative bookmarks, private workspace preferences and studio editing. Public studio forms are read-only previews; no new role or authorization is introduced. Existing API/auth/RLS and the data schema are unchanged.

Section URLs and initiative detail URLs work independently of component state. Detail links carry a guarded internal return path; closing replaces the detail history entry. Funding summaries and running balances derive from ledger entries before filters. Initiative cards do not represent separate crowdfunding campaigns. The private vote saves one personal demonstration preference and does not award funds or aggregate a community tally.

Public partner context lives in `src/lib/members/presentation.js`. Vanni Hope is confirmed for Microcredit by the public Aram initiative page. Other named partnerships, additional joint initiatives and specific districts must be confirmed before adding them. The AI learning concept is unapproved. Fictional ledger records are not receipts or verified impact evidence.

`AramBrand.jsx` preserves the original transparent logo and exact district SVG. Motion guides the active navigation indicator and initiative drawers; reduced-motion preferences remove these transitions. No captions, automatic audio or video appear in the dashboard. An eight-second OpenArt Wan 3.0 Prime study was generated with the user's approval for 560 credits, then rejected in review because its ribbons and camera move felt generic. The source and alpha-composited study remain outside the shipped application as review artifacts; no additional generation was purchased.

Public thought leadership lives at `/research/insights` and community events at `/community/events`; both are also available in the dashboard and on its overview. `src/data/community.js` is the shared public content source. The featured article preserves its real authors, publication date and Substack destination. No event is invented: only announced, scheduled future events appear, with a clear empty state until any are confirmed. Event times include a named time zone.

`/p1` is a small comparison landing page with V1 and V2 buttons. `/p1/v1` preserves the pre-feedback guest dashboard from commit `aa8441803bffd4ba2cbf12c13bad832d28b7f005`. Its only intentional adaptations are isolated selectors/animation names, the same public fixture anonymisation as the original guest API, and replacement of live API calls with that frozen fictional fixture. It cannot read or edit a private workspace. V2 opens `/members`.

Validate with `node --test tests/*.test.mjs`, focused ESLint for members source/routes/tests, `npm run build`, and desktop/phone keyboard and visual checks. No production deployment is implied by these checks. The full owner email-link/session/save flow and historical private-workspace import remain separate verification tasks.
