"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "القبلة" },
  { href: "/prayer-times", label: "مواقيت الصلاة" },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-white/10">
      <ul className="max-w-md mx-auto flex gap-2 p-3">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`block text-center rounded-xl py-2 font-semibold transition-colors ${
                  active
                    ? "bg-gold text-background"
                    : "text-foreground/80 hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
