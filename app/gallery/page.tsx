import { site } from "@/content/site";
import { getPhotos } from "@/lib/photos";
import PhotoGrid from "@/components/PhotoGrid";
import LinkButton from "@/components/LinkButton";
import Ornament from "@/components/Ornament";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Us" };

export default function GalleryPage() {
  const photos = getPhotos();

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="text-center">
        <h1 className="font-display text-4xl text-wine sm:text-5xl">PAMKIN</h1>
        <p className="mt-3 text-sm text-dusk">
          {photos.length > 0
            ? `${photos.length} WOW AMIES PICTURES`
            : "the album"}
        </p>
      </Reveal>

      <Ornament />

      <PhotoGrid photos={photos} />

      {/* Not the letter — that only unlocks after she says yes on /rsvp.
          This just puts her back on the main path. */}
      <div className="mt-20 text-center">
        <LinkButton href="/invitation" variant="quiet">
          {site.home.cta}
        </LinkButton>
      </div>
    </section>
  );
}
