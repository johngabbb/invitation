import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { captions, featured } from "@/content/site";

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export type Photo = {
  /** Filename as it sits in public/photos — the key used for captions. */
  file: string;
  /** URL path for <Image src>. */
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

const PHOTO_DIR = path.join(process.cwd(), "public", "photos");

/**
 * Reads public/photos at BUILD TIME and returns every image in it.
 * Drop files in that folder and they appear on the next build — there is
 * nothing to register anywhere. See docs/PHOTOS.md.
 */
export function getPhotos(): Photo[] {
  let files: string[];
  try {
    files = fs.readdirSync(PHOTO_DIR);
  } catch {
    // Folder missing entirely — render the site without photos rather than
    // failing the build.
    return [];
  }

  const photos = files
    .filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const caption = captions[file];
      let width = 1200;
      let height = 1600;
      try {
        const dims = imageSize(fs.readFileSync(path.join(PHOTO_DIR, file)));
        if (dims.width && dims.height) {
          width = dims.width;
          height = dims.height;
        }
      } catch {
        // Unreadable or corrupt — fall back to a portrait guess so the grid
        // still lays out instead of collapsing.
      }
      return {
        file,
        src: `/photos/${encodeURIComponent(file)}`,
        alt: caption ?? "A photo of us",
        caption,
        width,
        height,
      };
    });

  if (featured.length === 0) return photos;

  // Pull featured filenames to the front, in the order they were listed.
  const rank = new Map(featured.map((f, i) => [f, i]));
  return [...photos].sort((a, b) => {
    const ra = rank.get(a.file) ?? Number.MAX_SAFE_INTEGER;
    const rb = rank.get(b.file) ?? Number.MAX_SAFE_INTEGER;
    return ra - rb;
  });
}
