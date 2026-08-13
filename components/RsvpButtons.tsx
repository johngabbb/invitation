"use client";

import { useState } from "react";
import { site } from "@/content/site";
import Confetti from "./Confetti";
import Ornament from "./Ornament";

/** Where the "No" button starts. Fixed so server and client agree. */
const START = { x: 72, y: 50 };

function dodgeFrom(current: { x: number; y: number }) {
  // Keep trying until the new spot is far enough away to feel like a dodge.
  for (let attempt = 0; attempt < 12; attempt++) {
    const x = 10 + Math.random() * 80;
    const y = 12 + Math.random() * 76;
    if (Math.hypot(x - current.x, y - current.y) > 30) return { x, y };
  }
  return { x: 100 - current.x, y: 100 - current.y };
}

export default function RsvpButtons() {
  const [said, setSaid] = useState(false);
  const [noPos, setNoPos] = useState(START);
  const [dodges, setDodges] = useState(0);

  const dodge = () => {
    setNoPos((current) => dodgeFrom(current));
    setDodges((d) => d + 1);
  };

  if (said) {
    return (
      <>
        <Confetti />
        <div className="appear text-center">
          <p className="font-display text-5xl text-rosewood sm:text-6xl">♥</p>
          <h2 className="mt-6 font-display text-4xl text-wine sm:text-5xl">
            {site.rsvp.afterYes.title}
          </h2>
          <Ornament />
          <p className="mx-auto max-w-md leading-relaxed text-balance text-ink/80">
            {site.rsvp.afterYes.body}
          </p>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="relative h-56 w-full sm:h-44">
        <button
          onClick={() => setSaid(true)}
          className="absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine px-10 py-5 text-lg text-cream shadow-lg shadow-wine/25 transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:bg-rosewood hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rosewood"
          style={{ animation: "soft-pulse 2.8s ease-in-out infinite" }}
        >
          {site.rsvp.yes}
        </button>

        <button
          // Runs on hover (desktop) and on the first touch (mobile), so it
          // can never actually be pressed.
          onMouseEnter={dodge}
          onPointerDown={(e) => {
            e.preventDefault();
            dodge();
          }}
          onFocus={dodge}
          aria-label={`${site.rsvp.no} — but this button will not let you`}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-blush-deep bg-cream/80 px-7 py-3.5 text-sm text-dusk transition-all duration-300 ease-out"
          style={{ left: `${noPos.x}%`, top: `${noPos.y}%` }}
        >
          {site.rsvp.no}
        </button>
      </div>

      {site.rsvp.footnote && (
        <p className="mt-2 text-center text-xs text-dusk/70">
          {dodges >= 4 ? "…told you." : site.rsvp.footnote}
        </p>
      )}
    </div>
  );
}
