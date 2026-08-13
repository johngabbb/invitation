/** A small divider: a hairline, a heart, a hairline. */
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`my-8 flex items-center justify-center gap-3 ${className}`}
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-blush-deep sm:w-20" />
      <span className="text-sm text-rosewood">♥</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-blush-deep sm:w-20" />
    </div>
  );
}
