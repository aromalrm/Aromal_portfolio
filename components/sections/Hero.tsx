"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/data";
import { NowPlaying } from "@/components/ui/NowPlaying";

const SOCIAL_ICONS: Record<
  string,
  (props: { size?: number; strokeWidth?: number }) => React.ReactNode
> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

const KOLKATA_TIME_ZONE = "Asia/Kolkata";

/** Short local time, e.g. "1:53 pm", always in Asia/Kolkata. */
function formatKolkataTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: KOLKATA_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(/[\u202f\u00a0]/g, " ")
    .toLowerCase();
}

function KolkataClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatKolkataTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time
      suppressHydrationWarning
      className="inline-block min-w-[4.75rem] text-left tabular-nums"
    >
      {time}
    </time>
  );
}

export function Hero() {
  return (
    <section className="border-b border-border">
      <motion.div
        className="flex flex-col items-center text-center px-6 pt-10 pb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative mb-[22px] h-[120px] w-[120px] overflow-hidden rounded-2xl bg-card">
          <Image
            src="/images/profile.jpg"
            alt={`${PERSONAL_INFO.name} profile photo`}
            fill
            sizes="120px"
            className="object-cover object-center"
            priority
          />
        </div>

        <h1 className="text-[30px] font-semibold leading-none tracking-tight text-foreground">
          {PERSONAL_INFO.name}
        </h1>
        <p className="mt-[18px] text-[17px] leading-none text-muted-foreground">
          {PERSONAL_INFO.title}
        </p>
        <p className="mt-3 mb-5 text-[13px] leading-none text-muted-foreground">
          {PERSONAL_INFO.location}
          <span aria-hidden="true"> · </span>
          <KolkataClock />
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-4">
          {PERSONAL_INFO.bio}
        </p>

        <NowPlaying />

        <div className="w-10 h-px bg-border my-4" />

        <div className="flex flex-wrap justify-center gap-2.5">
          {SOCIAL_LINKS.map((link) => {
            const Icon = SOCIAL_ICONS[link.id];
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.id !== "email" ? "_blank" : undefined}
                rel={link.id !== "email" ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                title={link.label}
                className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:-translate-y-0.5 transition-all duration-200"
              >
                {Icon && <Icon size={16} strokeWidth={2} />}
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
