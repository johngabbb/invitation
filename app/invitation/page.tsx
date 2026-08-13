import { site } from "@/content/site";
import FloatingHearts from "@/components/FloatingHearts";
import LinkButton from "@/components/LinkButton";
import Ornament from "@/components/Ornament";

export const metadata = { title: "You're Invited" };

export default function InvitationPage() {
  return (
    <>
      <FloatingHearts count={8} />

      <section className="relative z-10 flex min-h-dvh items-center justify-center px-5 py-20">
        <div
          className="rise w-full max-w-2xl"
          style={{ animationDelay: "0.15s" }}
        >
          {/* The invitation card — double border, like a printed one. */}
          <div className="rounded-lg bg-cream/80 p-2 shadow-xl shadow-wine/10 ring-1 ring-blush-deep backdrop-blur-sm">
            <div className="rounded-md border border-blush-deep px-6 py-14 text-center sm:px-14 sm:py-20">
              <p className="text-[0.7rem] tracking-[0.3em] text-dusk uppercase sm:text-xs">
                {site.invitation.eyebrow}
              </p>

              <h1 className="mt-8 font-display text-4xl leading-tight text-wine sm:text-5xl">
                {site.event.title}
              </h1>

              <Ornament />

              <p className="mx-auto max-w-md text-base leading-relaxed text-balance text-ink/80">
                {site.invitation.teaser}
              </p>

              <p className="mt-10 font-display text-lg text-rosewood italic">
                for {site.her.name}
                {site.her.which && `, on her ${site.her.which} birthday`}
              </p>
            </div>
          </div>

          <div
            className="rise mt-12 text-center"
            style={{ animationDelay: "0.6s" }}
          >
            <LinkButton href="/details">{site.invitation.cta}</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
