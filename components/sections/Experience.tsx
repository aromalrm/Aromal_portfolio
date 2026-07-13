"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EXPERIENCE } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Experience() {
  return (
    <section
      id="experience"
      className="px-5 py-5"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        className="text-[11.5px] font-semibold text-foreground text-center mb-3"
      >
        Experience
      </h2>

      <motion.div
        className="flex flex-col gap-2 max-w-[560px] mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {EXPERIENCE.map((exp) => (
          <motion.article
            key={exp.id}
            variants={item}
            className="rounded-[10px] border border-border bg-card px-[13px] py-[11px] hover:border-border/60 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-1">
              <div className="flex items-center gap-[7px] flex-wrap">
                {exp.logo && (
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={16}
                    height={16}
                    className="w-4 h-4 rounded-full object-cover shrink-0"
                  />
                )}
                <h3 className="text-[12.5px] font-semibold text-foreground">
                  {exp.role}
                </h3>
                <span className="text-[10.5px] text-muted-foreground">
                  {exp.company}
                </span>
              </div>
              <span className="shrink-0 text-[9.5px] text-muted-foreground whitespace-nowrap">
                {exp.period}
              </span>
            </div>

            {exp.location && (
              <p className="text-[9.5px] text-muted-foreground mb-[7px]">
                {exp.location}
              </p>
            )}

            {exp.bullets.length > 0 && (
              <ul className="list-disc pl-4 flex flex-col gap-1">
                {exp.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-[10.5px] text-muted-foreground leading-relaxed"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
