import { site } from "@/content/site";
import FloatingHearts from "@/components/FloatingHearts";
import Nav from "@/components/Nav";
import Ornament from "@/components/Ornament";
import Reveal from "@/components/Reveal";

export const metadata = { title: "A Letter" };

export default function LetterPage() {
  return (
    <>
      {/* The only page with the menu. By the time she's here she's read
          everything, so let her wander back through it freely. */}
      <Nav />
      <FloatingHearts count={6} />

      <section className="relative z-10 mx-auto max-w-xl px-6 py-20 sm:py-28">
        <Reveal className="text-center">
          <h1 className="font-display text-4xl text-wine sm:text-5xl">
            {site.letter.title}
          </h1>
        </Reveal>

        <Ornament />

        <Reveal delay={0.1}>
          <article className="space-y-6 text-[1.0625rem] leading-[1.85] text-ink/85">
            <p className="font-display text-2xl text-rosewood italic">
              {site.her.nickname},
            </p>

            {site.letter.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <p className="pt-6 font-display text-xl text-rosewood italic">
              {site.letter.signoff}
              <br />
              {site.from}
            </p>
          </article>
        </Reveal>

        {/* No button onward — the letter is the last thing she reads. */}
      </section>
    </>
  );
}
