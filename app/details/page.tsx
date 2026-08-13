import { site } from "@/content/site";
import FloatingHearts from "@/components/FloatingHearts";
import LinkButton from "@/components/LinkButton";
import Ornament from "@/components/Ornament";
import Reveal from "@/components/Reveal";

export const metadata = { title: "The Details" };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-blush-deep/50 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <dt className="text-[0.7rem] tracking-[0.2em] text-dusk uppercase sm:pt-1">
        {label}
      </dt>
      <dd className="font-display text-xl text-wine sm:text-2xl">{value}</dd>
    </div>
  );
}

export default function DetailsPage() {
  const { event, details } = { event: site.event, details: site.details };

  return (
    <>
      <FloatingHearts count={6} />

      <section className="relative z-10 mx-auto max-w-2xl px-5 py-20 sm:py-28">
        <Reveal className="text-center">
          <h1 className="font-display text-4xl text-wine sm:text-5xl">
            The Details
          </h1>
          <p className="mt-3 text-sm text-dusk">{details.intro}</p>
        </Reveal>

        <Ornament />

        <Reveal delay={0.1}>
          <dl className="border-t border-blush-deep/50">
            <Row label="What" value={event.title} />
            <Row label="When" value={event.date} />
            <Row label="Time" value={event.time} />
            <Row label="Where" value={event.venue} />
            <Row label="Address" value={event.address} />
            <Row label="Dress code" value={event.dressCode} />
            {event.bring && <Row label="Bring" value={event.bring} />}
          </dl>
        </Reveal>

        {event.mapsUrl && (
          <Reveal delay={0.15} className="mt-8 text-center">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blush-deep px-6 py-3 text-sm text-wine transition-colors hover:bg-blush/60"
            >
              <span aria-hidden>📍</span> Open in Google Maps
            </a>
          </Reveal>
        )}

        {details.expect.length > 0 && (
          <Reveal delay={0.2} className="mt-16">
            <h2 className="text-center text-[0.7rem] tracking-[0.25em] text-dusk uppercase">
              What to expect
            </h2>
            <ul className="mt-6 space-y-3">
              {details.expect.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-blush/40 px-5 py-4 text-ink/85"
                >
                  <span aria-hidden className="mt-0.5 text-rosewood">
                    ♥
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={0.25} className="mt-16 text-center">
          <LinkButton href="/rsvp">{details.cta}</LinkButton>
        </Reveal>
      </section>
    </>
  );
}
