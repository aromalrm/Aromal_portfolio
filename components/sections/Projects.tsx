"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Projects() {
  if (PROJECTS.length === 0) return null;

  return (
    <section
      id="projects"
      className="bg-[#09090b] px-5 py-12 sm:px-8 sm:py-16"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto w-full max-w-[920px]">
        <h2
          id="projects-heading"
          className="mb-7 text-[22px] font-semibold tracking-tight text-white sm:mb-8"
        >
          Selected Projects
        </h2>

        <motion.div
          className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-2 md:gap-y-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {PROJECTS.map((project) => (
            <motion.article key={project.id} variants={card}>
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  className="h-auto w-full rounded-[22px]"
                  loading="lazy"
                />
              ) : null}

              <h3 className="mt-4 text-[17px] font-semibold leading-tight tracking-tight text-white">
                {project.name}
                <span aria-hidden="true"> →</span>
              </h3>
              <p className="mt-1 text-[15px] leading-snug text-[#9b9b9b]">
                {project.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
