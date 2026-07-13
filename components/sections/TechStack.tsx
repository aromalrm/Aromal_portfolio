"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { TECH_STACK, type TechItem } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Fallback icon if a name in lib/data.ts doesn't match a lucide export
const FALLBACK_ICON = "Code2";

export function TechStack() {
  return (
    <section className="px-5 py-6" aria-labelledby="techstack-heading">
      <h2
        id="techstack-heading"
        className="text-[11.5px] font-semibold text-foreground text-center tracking-wide mb-4"
      >
        TECH STACK
      </h2>

      <motion.div
        className="flex flex-wrap justify-center gap-x-[18px] gap-y-[16px] max-w-[480px] mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {TECH_STACK.map((tech) => (
          <motion.div key={tech.name} variants={item}>
            <TechIcon tech={tech} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TechIcon({ tech }: { tech: TechItem }) {
  const IconComponent = (Icons as unknown as Record<
    string,
    React.ComponentType<LucideProps>
  >)[tech.icon] ?? (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[FALLBACK_ICON];

  const color = tech.color ?? "#888888";

  return (
    <div
      className="flex flex-col items-center gap-1.5 transition-transform duration-150 hover:-translate-y-[3px] hover:scale-110"
      title={tech.name}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}1a` /* ~10% opacity tint */ }}
      >
        <IconComponent size={22} color={color} strokeWidth={2} />
      </div>
      <span className="text-[8.5px] text-muted-foreground text-center leading-tight">
        {tech.name}
      </span>
    </div>
  );
}
