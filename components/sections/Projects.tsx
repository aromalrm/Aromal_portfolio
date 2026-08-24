"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { PROJECTS } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      className="px-5 py-5"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="text-[11.5px] font-semibold text-foreground text-center mb-3"
      >
        Featured projects
      </h2>

      <motion.div
        className="flex flex-col gap-2 max-w-[560px] mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {PROJECTS.map((project) => (
          <motion.article
            key={project.id}
            variants={card}
            className="group rounded-[10px] border border-border bg-card overflow-hidden hover:border-border/60 transition-colors"
          >
            {/* Cover */}
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                className="w-full aspect-[20/9] object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className="w-full aspect-[20/9] flex items-center justify-center"
                style={{ background: project.gradient }}
                aria-hidden="true"
              >
                <span className="text-3xl font-extrabold text-white/10">
                  {project.name[0]}
                </span>
              </div>
            )}

            {/* Body */}
            <div className="px-[13px] py-[11px]">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex items-baseline gap-[7px] flex-wrap">
                  <h3 className="text-[12.5px] font-semibold text-foreground">
                    {project.name}
                  </h3>
                  {project.url && (
                    <a
                      href={`https://${project.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.name} website`}
                      className="inline-flex items-center rounded-[5px] border border-border px-1.5 py-px text-[9.5px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    >
                      Website
                    </a>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {project.status && (
                    <span
                      className={`text-[9.5px] ${
                        project.status === "Active"
                          ? "text-emerald-500"
                          : "text-amber-500"
                      }`}
                    >
                      {project.status}
                    </span>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} code on GitHub`}
                      className="inline-flex items-center gap-1 text-[9.5px] text-muted-foreground border border-border rounded-[5px] px-1.5 py-px hover:bg-accent hover:text-foreground transition-colors"
                    >
                      <Github size={10} />
                      Code
                    </a>
                  )}
                </div>
              </div>

              <p className="text-[10.5px] text-muted-foreground leading-relaxed mb-[7px]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-[3px]">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1 text-[9.5px] text-muted-foreground border border-border rounded-full px-2 py-px bg-background"
                  >
                    <tech.Icon size={10} color={tech.color} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
