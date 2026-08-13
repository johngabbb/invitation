import Link from "next/link";
import { site } from "@/content/site";
import { getPhotos } from "@/lib/photos";
import PhotoWall from "@/components/PhotoWall";
import FloatingHearts from "@/components/FloatingHearts";
import LinkButton from "@/components/LinkButton";
import Reveal from "@/components/Reveal";
import Ornament from "@/components/Ornament";

export default function Home() {
  const photos = getPhotos();

  return (
    <>
      <FloatingHearts />

      {/* ── The greeting ─────────────────────────────────────────── */}
      <section className="relative z-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-20 text-center">
        <p
          className="rise text-xs tracking-[0.35em] text-dusk uppercase sm:text-sm"
          style={{ animationDelay: "0.1s" }}
        >
          {site.home.eyebrow}
        </p>

        <h1
          className="rise mt-8 font-display text-5xl leading-[1.05] text-wine sm:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.3s" }}
        >
          {site.home.headline}
        </h1>

        <p
          className="rise mt-4 font-display text-3xl text-rosewood italic sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "0.5s" }}
        >
          {site.her.name}
        </p>

        <div className="rise" style={{ animationDelay: "0.7s" }}>
          <Ornament />
        </div>

        <p
          className="rise max-w-xl text-base leading-relaxed text-balance text-ink/80 sm:text-lg"
          style={{ animationDelay: "0.85s" }}
        >
          {site.home.subline}
        </p>

        <div className="rise mt-12" style={{ animationDelay: "1.05s" }}>
          <LinkButton href="/invitation">{site.home.cta}</LinkButton>
        </div>

        {photos.length > 0 && (
          <p
            className="rise mt-16 flex flex-col items-center gap-2 text-xs tracking-wider text-dusk"
            style={{ animationDelay: "1.4s" }}
          >
            {site.home.scrollHint}
            <span
              aria-hidden
              className="text-lg"
              style={{ animation: "nudge-down 2.2s ease-in-out infinite" }}
            >
              ↓
            </span>
          </p>
        )}
      </section>

      {/* ── The photo wall ───────────────────────────────────────── */}
      {photos.length > 0 && (
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-28 sm:px-6">
          <Reveal className="mb-10 text-center">
            <h2 className="font-display text-3xl text-wine sm:text-4xl">
              {site.home.wallTitle}
            </h2>
            <p className="mt-2 text-sm text-dusk">{site.home.wallSubtitle}</p>
          </Reveal>

          <PhotoWall photos={photos} />

          {photos.length > 12 && (
            <Reveal className="mt-10 text-center">
              <Link
                href="/gallery"
                className="text-sm text-rosewood underline decoration-blush-deep underline-offset-4 transition-colors hover:text-wine"
              >
                see all {photos.length} photos →
              </Link>
            </Reveal>
          )}
        </section>
      )}
    </>
  );
}
