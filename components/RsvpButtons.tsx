"use client";

import { useState } from "react";
import { site } from "@/content/site";
import Confetti from "./Confetti";
import LinkButton from "./LinkButton";
import Ornament from "./Ornament";

/**
 * Where the "No" button starts inside its own zone. Fixed rather than random
 * so the server and client render the same markup.
 */
const START = { x: 50, y: 50 };

/** Keeps the button fully inside its zone once the -50%/-50% shift is applied. */
const BOUNDS = { min: 22, max: 78 };

function dodgeFrom(current: { x: number; y: number }) {
  const span = BOUNDS.max - BOUNDS.min;
  // Keep trying until the new spot is far enough away to read as a dodge.
  for (let attempt = 0; attempt < 15; attempt++) {
    const x = BOUNDS.min + Math.random() * span;
    const y = BOUNDS.min + Math.random() * span;
    if (Math.hypot(x - current.x, y - current.y) > 28) return { x, y };
  }
  // Fall back to the mirror image of where it is now — always far away.
  return {
    x: BOUNDS.min + BOUNDS.max - current.x,
    y: BOUNDS.min + BOUNDS.max - current.y,
  };
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

          {/* The letter is the finale — it only unlocks once she's said yes. */}
          <div className="rise mt-12" style={{ animationDelay: "1.2s" }}>
            <LinkButton href="/letter">{site.letter.title}</LinkButton>
          </div>
        </div>
      </>
    );
  }

  // Before any attempt she sees the footnote; after that, one message per try.
  const { noMessages, footnote } = site.rsvp;
  const message =
    dodges === 0
      ? footnote
      : noMessages[Math.min(dodges - 1, noMessages.length - 1)];

  return (
    <div>
      {/* Yes lives in its own row and never moves. */}
      <div className="flex justify-center">
        <button
          onClick={() => setSaid(true)}
          className="rounded-full bg-wine px-10 py-5 text-lg text-cream shadow-lg shadow-wine/25 transition-colors duration-300 hover:bg-rosewood focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rosewood"
          style={{ animation: "soft-pulse 2.8s ease-in-out infinite" }}
        >
          {site.rsvp.yes}
        </button>
      </div>

      {/* No is confined to this box, which sits entirely below Yes — so the
          two can never overlap, whatever the screen size. */}
      <div className="relative mt-4 h-44 w-full sm:h-40">
        <button
          // Fires on hover (desktop) and on the first touch (mobile), so it
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

      {message && (
        <p
          // Re-keying restarts the fade, so each new line visibly lands.
          key={dodges}
          className="appear mt-1 text-center text-xs text-balance text-dusk/80"
        >
          {message}
        </p>
      )}
    </div>
  );
}
