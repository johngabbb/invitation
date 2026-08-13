"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/photos";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

/**
 * The full album on /gallery. Masonry via CSS columns, so portrait and
 * landscape shots sit together without cropping either of them.
 */
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <p className="py-20 text-center text-dusk">
        No photos yet — drop some into{" "}
        <code className="rounded bg-blush px-1.5 py-0.5 text-wine">
          public/photos/
        </code>
        .
      </p>
    );
  }

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        {photos.map((photo, i) => (
          <Reveal
            key={photo.file}
            delay={(i % 8) * 0.05}
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              onClick={() => setOpen(i)}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-blush shadow-sm ring-1 ring-blush-deep/40 transition-shadow hover:shadow-xl"
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {photo.caption && (
                <span className="block px-3 py-2.5 text-left text-xs text-dusk">
                  {photo.caption}
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          photos={photos}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      )}
    </>
  );
}
