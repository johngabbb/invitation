import Image from "next/image";
import type { Photo } from "@/lib/photos";
import Reveal from "./Reveal";

/**
 * The collage on the home page. A dense grid where some tiles are larger,
 * so it reads as an arrangement rather than a spreadsheet of thumbnails.
 *
 * Tiles crop to fill — put the photos you care about most first (see
 * `featured` in content/site.ts) so they land in the large tiles.
 */

// Repeating rhythm of tile sizes. Index 0 of each cycle is the large one.
const SPANS = [
  "col-span-2 row-span-2",
  "",
  "",
  "row-span-2",
  "",
  "",
  "col-span-2",
  "",
];

export default function PhotoWall({
  photos,
  limit = 12,
}: {
  photos: Photo[];
  limit?: number;
}) {
  const shown = photos.slice(0, limit);
  if (shown.length === 0) return null;

  return (
    <div
      className="grid auto-rows-[8.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-3 lg:auto-rows-[13rem] lg:grid-cols-4"
      role="list"
    >
      {shown.map((photo, i) => (
        <Reveal
          key={photo.file}
          delay={(i % 6) * 0.07}
          className={`${SPANS[i % SPANS.length]} min-h-0`}
        >
          <figure
            role="listitem"
            className="group relative h-full w-full overflow-hidden rounded-2xl bg-blush shadow-sm ring-1 ring-blush-deep/40"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              // Largest tile is roughly half the viewport on phones, a quarter on desktop.
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={i < 4}
            />
            {photo.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-wine/85 to-transparent p-3 text-xs text-cream transition-transform duration-300 group-hover:translate-y-0">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
