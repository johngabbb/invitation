/**
 * ─────────────────────────────────────────────────────────────
 *  ALL THE WORDS ON THE SITE LIVE HERE.
 *  Edit this file — you never need to touch the page components.
 *  Anything in [ brackets ] is a placeholder waiting for you.
 *  Reference: docs/CONTENT.md
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  /** Who it's for, and who it's from. */
  her: {
    name: "AMIESS",
    nickname: "PAMKIN",
    /** e.g. "24th" — used as "her 24th birthday". Leave "" to hide. */
    which: "26th",
  },
  from: "Bobee",

  /** The celebration itself. */
  event: {
    title: "Amies 26th Birthday Celebration ",
    date: "Saturday, the 15th of August (PHT) / Friday, 14th of August (PST)",
    time: "13:00 PHT / 21:00 PST",
    venue: "House of Am and Gab (HOAG)",
    address: "Discord - HOAG - picasso hotel",
    /** Paste a Google Maps share link. Leave "" to hide the map button. */
    mapsUrl: "",
    dressCode: "Don't wear anything :)",
    /** Leave "" to hide this row. */
    bring: "",
  },

  /** Page: /  — the greeting */
  home: {
    eyebrow: "there is only one day like this all year",
    headline: "Happy Birthday",
    subline:
      "The kindest, smartest, talented, and prettiest person I know",
    cta: "Wait — there's more",
    scrollHint: "scroll, I kept some memories down here",
    wallTitle: "us, so far",
    wallSubtitle: "a few of my favourite proofs that you exist",
  },

  /** Page: /invitation */
  invitation: {
    eyebrow: "You are cordially invited to",
    teaser:
      "Prepare for a day full of bobee and amies time. Get ready to look back at the things you have accomplished this year.",
    cta: "When & where",
  },

  /** Page: /details */
  details: {
    intro: "Everything you need to know, and nothing you don't.",
    expect: [
      "[ something to look forward to ]",
      "[ something else ]",
      "[ and one more ]",
    ],
    cta: "I'll be there",
  },

  /** Page: /rsvp */
  rsvp: {
    question: "So… will you come?",
    yes: "Yes ♥",
    no: "No",
    /** Shown after she presses yes. */
    afterYes: {
      title: "I knew it.",
      body: "[ Say something here — the last thing she reads on this site. ]",
    },
    /** Tiny text under the buttons. Leave "" to hide. */
    footnote: "(the other button is not a real option)",
  },

  /** Page: /letter */
  letter: {
    title: "One more thing",
    /** Each string is its own paragraph. Add as many as you want. */
    body: [
      "Happy 26th birthday, my love! ❤️ Even though we're miles apart, you're always close to my heart.",
      "I'm so grateful to have you in my life, and I can't wait until we can celebrate your birthdays together.",
      "I hope your day is as beautiful and special as you are. I love you always. 🥰🎂❤️",
    ],
    signoff: "With all my love,",
  },

  /** Browser tab / link preview. */
  meta: {
    title: "Happy Birthday",
    description: "A little something I made for you.",
  },
} as const;

/**
 * Optional captions, keyed by the EXACT filename in public/photos/.
 * Photos with no entry here simply show no caption.
 *
 * Example:
 *   "01-first-date.jpg": "The night I knew.",
 */
export const captions: Record<string, string> = {};

/**
 * Optional. Filenames listed here appear FIRST on the home page collage,
 * in this order. Everything else follows in filename order.
 * Use it to make sure the best photos land in the biggest tiles.
 *
 * Example:
 *   export const featured = ["01-first-date.jpg", "04-us.jpg"];
 */
export const featured: string[] = [];
