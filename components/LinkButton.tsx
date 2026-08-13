import Link from "next/link";

/**
 * The shared "take me to the next page" button. One per page, so the whole
 * site reads as a single path forward.
 */
export default function LinkButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "quiet";
}) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rosewood";

  const styles =
    variant === "solid"
      ? "bg-wine text-cream shadow-lg shadow-wine/20 hover:bg-rosewood hover:shadow-xl hover:shadow-wine/25 hover:-translate-y-0.5"
      : "border border-blush-deep text-wine hover:bg-blush/60 hover:-translate-y-0.5";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
