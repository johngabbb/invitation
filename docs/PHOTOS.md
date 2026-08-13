# Photos

## The short version

Drop image files into **`public/photos/`**. That's it. They appear on the home page collage
and in `/gallery` automatically on the next build.

---

## Supported formats

`.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif`

Anything else in the folder is ignored, so a stray `.DS_Store` or `.txt` won't break the build.

---

## Ordering

Photos are sorted **by filename**. To control the order, prefix them with numbers:

```
public/photos/
├── 01-first-date.jpg
├── 02-that-trip-to-baguio.jpg
├── 03-her-birthday-last-year.jpg
└── 04-us.jpg
```

Use `01`…`09` (two digits) so `10` doesn't sort before `2`.

If order doesn't matter, name them anything.

---

## Captions

Optional. Add them in `content/site.ts` keyed by the exact filename:

```ts
export const captions: Record<string, string> = {
  "01-first-date.jpg": "The night I knew.",
  "02-that-trip-to-baguio.jpg": "You were freezing and still smiling.",
};
```

Photos without an entry just show no caption.

---

## Size and performance

Phone photos are typically 3–5 MB each. `next/image` resizes and lazy-loads them
automatically, so the site stays fast even with 50+ images — but the **source files still
get committed to git**, and a few hundred MB of photos makes the repo unpleasant to clone
and slows Vercel builds.

Rule of thumb:

- **Under ~50 photos** → just dump them in, it's fine.
- **More than that, or files over ~5 MB** → downscale first. Longest edge 2000px is plenty
  for a web gallery:

  ```bash
  # requires imagemagick:  sudo apt install imagemagick
  cd public/photos
  mogrify -resize 2000x2000\> -quality 82 *.jpg
  ```

  Back up the originals somewhere else before running that — `mogrify` overwrites in place.

---

## Portrait vs landscape

The gallery uses a masonry layout, so mixed orientations look fine without cropping.
The home page collage crops to fill its tiles, so photos where her face is near the edge
may get cut — put the ones you care most about in the first few positions and check them
after the first build.

---

## How it works under the hood

`lib/photos.ts` runs on the server at **build time** and reads the directory listing:

```ts
fs.readdirSync(path.join(process.cwd(), "public", "photos"))
```

Because it runs at build time, new photos only show up **after a rebuild**. On Vercel that
happens automatically on every `git push`, so the workflow is:

```bash
cp ~/Pictures/us/*.jpg public/photos/
git add public/photos
git commit -m "add photos"
git push          # Vercel rebuilds, photos are live in ~1 minute
```

Locally, `npm run dev` picks up new files on refresh.
