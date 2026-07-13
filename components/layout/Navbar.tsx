"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", external: false },
  { href: "/about", label: "About", external: false },
  { href: "/resume.pdf", label: "Resume", external: true },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      {/* 3-column grid keeps the tabs centered while the toggle stays right */}
      <nav
        className="grid grid-cols-[1fr_auto_1fr] items-center h-14 px-5"
        aria-label="Main navigation"
      >
        <span aria-hidden="true" />

        <ul className="flex items-center gap-1 justify-self-center" role="list">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors inline-flex items-center gap-1.5"
                >
                  {link.label}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm px-3 py-1.5 rounded-md transition-colors",
                    pathname === link.href
                      ? "text-foreground font-medium bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
