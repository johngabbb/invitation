/**
 * Slow hearts drifting up behind the content. Purely decorative.
 *
 * Positions come from a deterministic pseudo-random function rather than
 * Math.random() so the server and client render identical markup — random
 * values here would cause a hydration mismatch.
 */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function FloatingHearts({ count = 14 }: { count?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {Array.from({ length: count }, (_, i) => {
        const left = seeded(i, 1) * 100;
        const duration = 16 + seeded(i, 2) * 16;
        const delay = seeded(i, 3) * -30;
        const size = 10 + seeded(i, 4) * 16;

        return (
          <span
            key={i}
            className="absolute bottom-[-10vh] text-blush-deep"
            style={{
              left: `${left}%`,
              fontSize: `${size}px`,
              animation: `float-up ${duration}s linear ${delay}s infinite`,
            }}
          >
            ♥
          </span>
        );
      })}
    </div>
  );
}
