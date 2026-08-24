"use client";

import { motion } from "framer-motion";
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
  return (
    <section className="px-5 py-5" aria-labelledby="techstack-heading">
      <h2
        id="techstack-heading"
        className="text-[11.5px] font-semibold text-foreground text-center tracking-wide mb-3"
      >
        TECH STACK
      </h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-[520px] mx-auto"
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
  const { Icon, name, color, generic, icon } = tech;

  return (
    <div
      className="group flex min-h-[68px] flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card px-1.5 py-2 transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-accent focus-within:-translate-y-0.5 focus-within:border-foreground/30"
      title={name}
    >
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-5 w-5 object-contain"
        />
      ) : (
        <Icon
          size={generic ? 20 : 22}
          strokeWidth={generic ? 1.75 : undefined}
          className={color ? undefined : "text-foreground"}
          color={color}
        />
      )}
      <span className="text-[9px] font-medium text-muted-foreground group-hover:text-foreground group-focus-within:text-foreground">
        {name}
      </span>
    </div>
  );
}
