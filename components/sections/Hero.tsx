"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Github, Linkedin, Twitter } from "lucide-react";
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

export function Hero() {
  return (
    <section className="border-b border-border">
      <motion.div
        className="flex flex-col items-center text-center px-6 pt-10 pb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Avatar */}
        <div className="relative inline-block mb-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-card">
            <Image
              src="/images/profile.jpg"
              alt={`${PERSONAL_INFO.name} profile photo`}
              fill
              sizes="80px"
              className="object-cover object-[center_35%]"
              priority
            />
          </div>
          {PERSONAL_INFO.availableForWork && (
            <span
              className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"
              title="Available for work"
              aria-label="Available for work"
            />
          )}
        </div>

        {/* Name + title */}
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1.5">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          {PERSONAL_INFO.title}
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <InfoPill icon={<MapPin size={12} />} text={PERSONAL_INFO.location} />
          <InfoPill icon={<Mail size={12} />} text={PERSONAL_INFO.email} />
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-4">
          {PERSONAL_INFO.bio}
        </p>

        {/* Spotify last played */}
        <NowPlaying />

        {/* Divider */}
        <div className="w-10 h-px bg-border my-4" />

        {/* Icon-only social links */}
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

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-[11px]">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-foreground">{text}</span>
    </div>
  );
}
