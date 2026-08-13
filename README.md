# invitation

A birthday greeting + invitation site, built with Next.js + Tailwind, deployed on Vercel.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
```

## What's left to do

**Fill in the words.** Everything she reads lives in one file — [`content/site.ts`](content/site.ts).
Anything showing as `[ in brackets ]` is a placeholder waiting for you.
Use [`docs/CONTENT.md`](docs/CONTENT.md) as the checklist of what to write.

Nothing else is required — photos are already in, and the site builds and runs today.

## Where things are

| | |
|---|---|
| ✍️ **The words** | [`content/site.ts`](content/site.ts) — the only file you need to edit |
| 📋 **The plan** | [`PLAN.md`](PLAN.md) — pages, structure, deploy steps |
| 📸 **The photos** | [`public/photos/`](public/photos/) — drop files in, they appear automatically ([how](docs/PHOTOS.md)) |

## The pages

```
/            HAPPY BIRTHDAY + photo collage
/invitation  the invitation card
/details     when / where / dress code
/rsvp        yes button (the "No" runs away from the cursor)
/gallery     the full album, click any photo to open it
/letter      the long message
```

## Deploy

Push to GitHub → import the repo at [vercel.com](https://vercel.com) → deploy.
Framework auto-detects, no env vars needed. Every push after that redeploys automatically.
