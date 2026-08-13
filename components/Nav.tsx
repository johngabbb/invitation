"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/invitation", label: "Invitation" },
  { href: "/details", label: "Details" },
  { href: "/gallery", label: "Gallery" },
  { href: "/letter", label: "Letter" },
  { href: "/rsvp", label: "RSVP" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 border-b border-blush-deep/40 bg-cream/70 backdrop-blur-md">
      <ul className="mx-auto flex max-w-3xl items-center justify-center gap-1 overflow-x-auto px-4 py-3 sm:gap-2">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-full px-3 py-1.5 text-xs tracking-wide whitespace-nowrap uppercase transition-colors sm:text-[0.7rem] ${
                  active
                    ? "bg-blush text-wine"
                    : "text-dusk hover:bg-blush/60 hover:text-wine"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
