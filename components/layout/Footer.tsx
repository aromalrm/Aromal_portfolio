import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/data";

const FOOTER_NAV = [
  { href: "/about", label: "About", external: false },
  { href: "/resume.pdf", label: "Resume", external: true },
  { href: "/#contact", label: "Contact", external: false },
];

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<LucideProps>
> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10px] text-muted-foreground order-2 sm:order-1">
          © {year} {PERSONAL_INFO.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4 order-1 sm:order-2">
          <nav aria-label="Footer navigation">
            <ul className="flex gap-3" role="list">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.id];
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.id !== "email" ? "_blank" : undefined}
                  rel={link.id !== "email" ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {Icon && <Icon size={14} />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
