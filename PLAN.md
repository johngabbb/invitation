# Birthday Invitation Site — Plan

A multi-page birthday greeting + invitation site for my girlfriend.
Built with **Next.js (App Router) + Tailwind CSS**, deployed on **Vercel**.

Fill in the real names/dates/venue in [`docs/CONTENT.md`](docs/CONTENT.md) — that file is the
single place all the wording lives, so the pages stay clean.

---

## 1. The experience (what she sees)

She opens one link. It unfolds like a little story, one page at a time:

```
  /               →  "HAPPY BIRTHDAY <Name>"  + a wall of our photos
       ↓  [ button: There's something else... ]
  /invitation     →  "You are cordially invited to ..."   the formal invite card
       ↓  [ button: Tell me when & where ]
  /details        →  date, time, place, dress code, map link
       ↓  [ button: Say yes ]
  /rsvp           →  her reply (a playful yes / no button)
       ↓
  /gallery        →  every photo, full album  (reachable from anywhere in the nav)
  /letter         →  the long message from me  (optional, linked from / and /rsvp)
```

Design intent: warm, soft, a bit romantic. Big serif headings, lots of whitespace,
photos doing the emotional work. Subtle fade/slide-in animations, never anything that
gets in the way of reading. Mobile-first — she will open this on her phone.

---

## 2. Pages

| Route | Purpose | Key elements |
|---|---|---|
| `/` | The greeting. First impression. | Full-screen "HAPPY BIRTHDAY" hero, animated photo wall / collage behind or below it, confetti or floating hearts, primary CTA button to `/invitation` |
| `/invitation` | The actual invite. | Centered invitation card ("You are invited to ..."), decorative border, her name, one-line teaser of the occasion, CTA to `/details` |
| `/details` | Logistics. | Date, time, venue, dress code, small "what to expect" list, Google Maps link, add-to-calendar link, CTA to `/rsvp` |
| `/rsvp` | Her answer. | Big "Yes ♥" button; a "No" button that playfully dodges the cursor / moves away. On yes → celebration state + optional confirmation |
| `/gallery` | The album. | Responsive masonry grid of every photo in `public/photos`, lightbox on click, optional captions |
| `/letter` | The message. | Long-form letter, quiet typography, no distractions |

**Shared across pages:** a minimal top nav (or a small floating menu), page-transition
fade, background music toggle (optional — muted by default, never autoplay with sound).

---

## 3. Project structure

```
invitation/
├── app/
│   ├── layout.tsx            # html shell, fonts, nav, page-transition wrapper
│   ├── page.tsx              # /            → Happy Birthday
│   ├── invitation/page.tsx   # /invitation
│   ├── details/page.tsx      # /details
│   ├── rsvp/page.tsx         # /rsvp
│   ├── gallery/page.tsx      # /gallery
│   ├── letter/page.tsx       # /letter
│   └── globals.css           # tailwind import + theme tokens
│
├── components/
│   ├── Nav.tsx
│   ├── PhotoWall.tsx         # the collage on the home page
│   ├── PhotoGrid.tsx         # the masonry grid on /gallery
│   ├── Lightbox.tsx          # full-screen viewer, arrow keys + swipe targets
│   ├── LinkButton.tsx        # the shared "next page" CTA button
│   ├── Ornament.tsx          # the ── ♥ ── divider
│   ├── Reveal.tsx            # fades children up as they scroll into view
│   ├── RsvpButtons.tsx       # yes button + the "No" that runs away
│   ├── Confetti.tsx
│   └── FloatingHearts.tsx
│
├── content/
│   └── site.ts               # ← ALL the text/dates/names, typed. Edit this, not the pages.
│
├── lib/
│   └── photos.ts             # reads public/photos at build time → list of images
│
├── public/
│   ├── photos/               # ← DUMP PHOTOS HERE  (see public/photos/README.md)
│   └── music/                # optional background track
│
├── docs/
│   ├── CONTENT.md            # fill-in-the-blanks for names/date/venue/messages
│   └── PHOTOS.md             # how the photo pipeline works
│
├── PLAN.md                   # this file
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 4. How photos work

**You just drop files into `public/photos/`.** Nothing else.

`lib/photos.ts` reads that directory on the server at build time and returns the list, so
every page picks up new photos automatically on the next deploy. No manifest to maintain,
no filenames to type into code.

```ts
// lib/photos.ts  (server-only — runs at build time)
import fs from "node:fs";
import path from "node:path";

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export function getPhotos() {
  const dir = path.join(process.cwd(), "public", "photos");
  return fs
    .readdirSync(dir)
    .filter((f) => EXT.has(path.extname(f).toLowerCase()))
    .sort()                              // filename order — prefix 01-, 02- to control it
    .map((f) => ({ src: `/photos/${f}`, alt: f }));
}
```

Ordering is by filename, so name them `01-first-date.jpg`, `02-beach.jpg` … if the order
matters. Captions are optional and live in `content/site.ts`, keyed by filename.

Images render through `next/image` for automatic resizing and lazy loading — important
because phone photos are 3–5 MB each and there may be dozens of them.

Full detail: [`docs/PHOTOS.md`](docs/PHOTOS.md).

---

## 5. Tech decisions

| Choice | Why |
|---|---|
| Next.js App Router + TypeScript | What you asked for; file-based routing means one folder per page |
| Tailwind CSS v4 | Styling without a separate CSS file per component |
| `next/image` | Photo-heavy site — automatic compression/lazy-load is the difference between fast and unusable on mobile data |
| Framer Motion | Page transitions and the entrance animations, small and declarative |
| Static export (SSG) | Every page is static; Vercel serves it from CDN, free tier, instant loads |
| No database | RSVP is a client-side celebration — no backend to maintain. Can be upgraded to email/webhook later |
| `image-size` | Reads each photo's real dimensions at build time so the masonry gallery lays out with no cropping and no layout shift |

**Deviation from the original plan:** animations are plain CSS (`@keyframes` in
`globals.css` + a small `Reveal` component using IntersectionObserver) instead of Framer
Motion. Same effect, one less dependency, and nothing extra shipped to her phone.

**Fonts:** one display serif for headings (e.g. Playfair Display / Cormorant) + one clean
sans for body (e.g. Inter), both via `next/font/google` so there's no layout shift.

---

## 6. Build order

1. ~~**Scaffold** — `create-next-app` (TypeScript, Tailwind, App Router), strip the boilerplate.~~ ✅
2. ~~**Theme** — colors, fonts, tokens in `globals.css`; `LinkButton` + `Nav` + `Ornament`.~~ ✅
3. ~~**Content layer** — `content/site.ts`, every string on the site.~~ ✅
4. ~~**Photo pipeline** — `lib/photos.ts` + `PhotoWall` + `PhotoGrid` + `Lightbox`.~~ ✅
5. ~~**Page `/`** — hero + photo wall + CTA.~~ ✅
6. ~~**Pages `/invitation` → `/details` → `/rsvp`** — the linked flow.~~ ✅
7. ~~**Pages `/gallery` + `/letter`.**~~ ✅
8. ~~**Polish** — CSS animations, scroll reveals, floating hearts, confetti, dodging "No".~~ ✅
9. **Real content** — swap placeholders for the real words. ← **you are here**
10. **Deploy** — push to GitHub, import to Vercel, check on an actual phone.

Photos are already in (`public/photos/`, 26 of them). What's left is step 9: fill in
`content/site.ts` using [`docs/CONTENT.md`](docs/CONTENT.md) as the checklist.

---

## 7. Deploying to Vercel

1. `git push` this repo to GitHub.
2. vercel.com → **Add New → Project** → import the repo. Framework auto-detects as Next.js;
   no env vars needed.
3. Deploy. You get `<project>.vercel.app`.
4. Optional: buy a cheap domain and point it at the project in **Settings → Domains**
   (something like `happybirthday-<hername>.com` is a nice touch).
5. Every `git push` to `main` redeploys automatically — including when you add photos.

**Before sending her the link:** open it on a phone on mobile data, check the photos load
fast, check nothing overflows, and confirm no sound autoplays.

---

## 8. Open items

These need your input before or during step 9 — see [`docs/CONTENT.md`](docs/CONTENT.md):

- [ ] Her name / nickname as it should appear
- [ ] The date, time, and venue of the celebration
- [ ] What the celebration actually is (dinner? surprise party? a day out?)
- [ ] Dress code, if any
- [ ] The letter text
- [ ] Whether the site should be a surprise (unlisted URL) or shared
- [ ] Background music track, if you want one
