# Exit 18 Equipment website

Marketing site based on `exit18-website-v3.html`. Content lives in **`content/siteContent.ts`** — edit that file (or ask an AI to edit it) instead of touching component markup.

## Run locally

```bash
cd exit18-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

- `npx prisma migrate deploy` — apply DB migrations (production / CI; requires `DATABASE_URL`)
- `npm run build` — production build (`prisma generate` runs first via `postinstall` / `build` script)
- `npm run start` — serve production build locally
- `npm run lint` — ESLint

## Database isolation (website vs maintenance portal)

This project’s **`DATABASE_URL`** must be a **separate** Postgres database used **only** for this marketing site (e.g. `ServiceRequest` rows and Prisma migrations). **Do not** point it at the **maintenance portal** production database: that would risk mixing schemas, migrations, and live portal data.

**Long term**, service requests may be owned by the portal and accepted through a **dedicated API** on the portal side; until that integration is designed and deployed on purpose, keep the website database **isolated**.

## Deploy on Vercel

1. Push this folder to GitHub/GitLab/Bitbucket (only `exit18-website/` or the repo root containing it).
2. Sign in at [vercel.com](https://vercel.com) → **Add New Project**.
3. Import the repo; Vercel detects Next.js. Defaults are fine (`npm install`, `npm run build`, output `.next`).
4. Deploy.

**Images:** The logo file is **`public/images/exit18-logo.png`**, referenced from `content/siteContent.ts` (`branding.logoUrl`) and in **`components/Navbar.tsx`** as `/images/exit18-logo.png`. The navbar logo uses **`mix-blend-lighten`** so unwanted dark matte around the artwork blends into the green header—it is a temporary visual patch. **The ideal permanent fix** is an asset such as **true-transparent PNG or SVG where the roadside “sign” silhouette is separate from alpha** (dark rectangle not baked flat into the raster), then you can remove `mix-blend-lighten` from `components/Navbar.tsx` and rely on normal rendering. Hero and story photos still load from `www.exit18equipment.com`; that domain is listed in `next.config.ts` for `next/image`. Add `remotePatterns` if you move those files.

**Service requests & admin:** Prisma + Postgres store `/api/service-request` submissions in the **website-only** database (see **Database isolation** above). **Resend** emails `SERVICE_NOTIFICATION_EMAIL` (default `service@exit18equipment.com`). Env vars in **`.env.example`**. **`/admin`** is cookie-protected: set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.


## Updating content later (including with AI)

1. Open **`content/siteContent.ts`**. Everything customer-facing is structured here: headings, CTAs, hours, brands, URLs, footer, etc.
2. Prompt any assistant with specifics, for example:
   - *“In `content/siteContent.ts`, change Saturday hours to **8–1**, keep the rest of hours the same.”*
   - *“Add **Stihl** to `brands.names`.”*
   - *“Replace `assets.heroImageUrl` with `/images/spring-hero.jpg` and put the file in `public/images/`.”* (Then switch from remote URL to `/images/...`; local files don’t need `remotePatterns`.)
   - *“Update `hero.stats` first stat to **35+** years.”*
3. Avoid editing `app/page.tsx` or components unless you are changing layout or new sections — keeps changes small and AI-friendly.

**Rich text:** A few fields use HTML strings (`story.paragraphs`, portal step copy) so you can bold words with `<strong>...</strong>`. Trusted content only.

## Project layout

```
exit18-website/
├── content/siteContent.ts   # Homepage, `aboutPage`, `servicePage`, contact, hours, etc.
├── app/
│   ├── layout.tsx           # SEO defaults, fonts (Barlow / Barlow Condensed / Caveat)
│   ├── page.tsx             # Homepage — composes sections
│   ├── about/page.tsx       # About — same Navbar/Footer shell
│   ├── service/page.tsx     # Service & Repairs — lead form (POST → `api/service-request`)
│   ├── api/service-request/route.ts  # Saves to website DB + email (Resend)
│   └── globals.css          # Brand colors & base styles
├── components/              # Section components (`about/`, `service/`, …)
├── next.config.ts           # Image domains for next/image
└── public/                  # Static files (optional); reference as /filename
```

The original single-file mockup remains at `../exit18-website-v3.html` next to this folder for comparison.
