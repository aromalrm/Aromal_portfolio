"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Database } from "lucide-react";
import { TECH_STACK, type TechItem } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function TechStack() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section className="px-5 py-6" aria-labelledby="techstack-heading">
      <h2
        id="techstack-heading"
        className="text-[11.5px] font-semibold text-foreground text-center tracking-wide mb-4"
      >
        TECH STACK
      </h2>

      <motion.div
        className="flex flex-wrap justify-center gap-x-[22px] gap-y-[18px] max-w-[480px] mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {TECH_STACK.map((tech) => (
          <motion.div key={tech.name} variants={item}>
            <TechIcon tech={tech} isDark={isDark} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TechIcon({ tech, isDark }: { tech: TechItem; isDark: boolean }) {
  // No official brand logo (e.g. SQL) → database glyph
  if (tech.noLogo) {
    return (
      <div
        className="w-[46px] h-[46px] flex items-center justify-center transition-transform duration-150 hover:-translate-y-[3px] hover:scale-110"
        title={tech.name}
      >
        <Database size={30} className="text-foreground" strokeWidth={1.75} />
      </div>
    );
  }

  // Adaptive color for logos whose brand color is too dark on a dark bg.
  // tech.icon looks like "https://cdn.simpleicons.org/<slug>"; append a color.
  const src = tech.mono
    ? `${tech.icon}/${isDark ? "white" : "111111"}`
    : tech.icon;

  return (
    <div
      className="w-[46px] h-[46px] flex items-center justify-center transition-transform duration-150 hover:-translate-y-[3px] hover:scale-110"
      title={tech.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${tech.name} logo`}
        width={36}
        height={36}
        className="w-9 h-9 object-contain"
        loading="lazy"
      />
    </div>
  );
}
