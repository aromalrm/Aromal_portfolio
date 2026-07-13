# Aromal Ramesh — Data Analyst Portfolio

A modern, production-ready personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Centered single-page layout with dark/light mode, a GitHub-style contribution graph, floating brand-logo tech stack, featured projects, a two-card contact section, a Spotify "last played" widget, and a quote box.

---

## Features

- Next.js 14 (App Router) + TypeScript
- Dark / light mode (defaults to dark) via `next-themes`
- Fully responsive — desktop, tablet, mobile
- Framer Motion animations
- GitHub-style contribution graph
- Real brand-logo tech stack (Simple Icons)
- Contact form (Zod validation + Nodemailer email delivery + auto-reply)
- Spotify "last played" track (live via Spotify API, with graceful fallback)
- Resume link that opens your PDF
- SEO optimized (Open Graph, Twitter cards, metadata)
- WCAG-minded accessibility (keyboard nav, aria labels, reduced motion)
- One-click deploy to Vercel

---

## Project Structure

```
aromal-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, fonts, SEO metadata
│   ├── page.tsx                # Home (composes all sections)
│   ├── globals.css             # Tailwind + theme variables
│   ├── about/page.tsx          # About page (bio, skills, projects, education)
│   └── api/
│       ├── contact/route.ts    # Contact form handler (Nodemailer)
│       └── spotify/route.ts    # Spotify recently-played handler
├── components/
│   ├── layout/                 # Navbar, Footer, ThemeProvider
│   ├── sections/               # Hero, ContributionGraph, TechStack,
│   │                           #   Projects, Contact, Quote
│   └── ui/                     # ThemeToggle, NowPlaying
├── lib/
│   ├── data.ts                 # ← ALL your content lives here
│   └── utils.ts
├── public/                     # resume.pdf, og-image.png, images/ go here
├── .env.example
└── ...config files
```

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Environment variables
cp .env.example .env.local
#    then fill in the values (see below)

# 3. Add your resume
#    Drop your PDF at:  public/resume.pdf

# 4. Run
npm run dev        # → http://localhost:3000
```

---

## Customizing Content

**Everything is in `lib/data.ts`:**

| What | Where |
|------|-------|
| Name, title, bio, email, location | `PERSONAL_INFO` |
| Social links (GitHub, LinkedIn, X, email) | `SOCIAL_LINKS` |
| Tech stack logos | `TECH_STACK` |
| Featured projects | `PROJECTS` |
| Spotify fallback track | `SPOTIFY_FALLBACK` |
| Quote | `QUOTE` |

The About page content (education, certifications, detailed projects) is in `app/about/page.tsx`.

> **Email note:** Your resume lists `aaromalr7@gmail.com`, but the site currently uses `aaromalrm@gmail.com`. Update `PERSONAL_INFO.email`, `SOCIAL_LINKS`, and `CONTACT_TO_EMAIL` (in `.env`) to whichever is correct.

### Add your photo (optional)
Put a photo at `public/images/profile.jpg`, then in `components/sections/Hero.tsx` replace the initials `<div>` with a `next/image`.

---

## Environment Variables

```env
# Contact form (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password      # use an App Password, not your login
CONTACT_TO_EMAIL=aaromalrm@gmail.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Spotify (optional — see below)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

**Gmail App Password:** enable 2FA on your Google account, then go to
myaccount.google.com → Security → App passwords → generate one for "Mail".

---

## Spotify "Last Played" Integration

Without setup, the widget shows the fallback track from `lib/data.ts`. To show your **real** most-recent track:

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) → **Create App**.
2. Set a Redirect URI of `http://localhost:3000` (any valid URL works for this one-time step).
3. Copy your **Client ID** and **Client Secret** into `.env.local`.
4. Get a **refresh token** (one time). In your browser, visit (replace CLIENT_ID):
   ```
   https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-recently-played
   ```
   Approve, then copy the `code=...` value from the URL you're redirected to.
5. Exchange it for a refresh token (run in a terminal; replace the placeholders):
   ```bash
   curl -X POST https://accounts.spotify.com/api/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code&code=THE_CODE&redirect_uri=http://localhost:3000&client_id=CLIENT_ID&client_secret=CLIENT_SECRET"
   ```
6. Copy the `refresh_token` from the response into `SPOTIFY_REFRESH_TOKEN`.

The `/api/spotify` route refreshes the access token automatically on each request. Done — your last-played song now shows live.

---

## Deploying: GitHub → Vercel → Your Domain

### Step 1 — Test locally
```bash
npm install
npm run dev
```
Confirm everything looks right and edit `lib/data.ts` as needed.

### Step 2 — Push to GitHub
Create a new **empty** repo on GitHub (no README/.gitignore). Then:
```bash
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
`.gitignore` already excludes `node_modules` and `.env.local`, so your secrets stay private.

### Step 3 — Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → sign in with GitHub.
2. **Add New → Project** → import your repo.
3. Framework preset auto-detects **Next.js** — no config needed.
4. Expand **Environment Variables** and add everything from your `.env.local`
   (SMTP_*, CONTACT_TO_EMAIL, NEXT_PUBLIC_SITE_URL, and Spotify keys if used).
5. Click **Deploy**. In ~1 minute you get a live URL like `your-repo.vercel.app`.

### Step 4 — Connect your custom domain
1. In the Vercel project → **Settings → Domains** → add your domain.
2. Vercel shows the DNS records to set. At your registrar (GoDaddy, Namecheap, etc.):
   - **Root domain** (`example.com`): add an `A` record → Vercel's IP (Vercel shows it, currently `76.76.21.21`).
   - **www**: add a `CNAME` record → `cname.vercel-dns.com`.
3. Wait for DNS to propagate (minutes to a couple hours). Vercel auto-issues a free SSL cert, so `https://` just works.

> No domain yet? You can buy one directly inside Vercel and it configures automatically.

### Ongoing updates
Every `git push` to `main` triggers an automatic rebuild + redeploy on Vercel. That's your whole update workflow.

---

## Before You Ship — Checklist

- [ ] `public/resume.pdf` added (so the Resume link works)
- [ ] `lib/data.ts` reviewed — email, social URLs, projects, GitHub links
- [ ] `.env.local` filled in (contact form + optional Spotify)
- [ ] `public/og-image.png` added (1200×630 social preview) — optional
- [ ] `public/favicon.ico` added — optional
- [ ] Confirm which email is correct (aaromalrm vs aaromalr7)

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |

---

## Alternative: Resend for email

Simpler than SMTP. `npm install resend`, then swap the Nodemailer block in
`app/api/contact/route.ts` for a `resend.emails.send(...)` call and add
`RESEND_API_KEY` to your env.

---

## License

MIT — use this freely as a base for your own portfolio.

**Aromal Ramesh** · aaromalrm@gmail.com

---

## Credits

The animated samurai character in the hero uses sprites from
**CraftPix.net — "Free Shinobi Sprites Pixel Art"** (Samurai set),
used under the [CraftPix free license](https://craftpix.net/file-licenses/)
(free for commercial and non-commercial projects). The raw sprite files
are not redistributed on their own — they're used only as part of this site.
If you fork this project, review CraftPix's license terms for your own use.
