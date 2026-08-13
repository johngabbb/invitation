import { site } from "@/content/site";
import FloatingHearts from "@/components/FloatingHearts";
import RsvpButtons from "@/components/RsvpButtons";

export const metadata = { title: "RSVP" };

export default function RsvpPage() {
  return (
    <>
      <FloatingHearts count={10} />

      <section className="relative z-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-5 py-20">
        <div className="w-full max-w-xl">
          <h1
            className="rise mb-14 text-center font-display text-4xl text-balance text-wine sm:text-5xl"
            style={{ animationDelay: "0.15s" }}
          >
            {site.rsvp.question}
          </h1>

          <div className="rise" style={{ animationDelay: "0.4s" }}>
            <RsvpButtons />
          </div>
        </div>
      </section>
    </>
  );
}
