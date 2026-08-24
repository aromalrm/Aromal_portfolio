import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PERSONAL_INFO, TECH_STACK } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Aromal Ramesh — Data Analyst based in Bengaluru, India. Background, skills, projects, and education.",
};

const PROJECTS: {
  name: string;
  stack: string;
  points: string[];
}[] = [];

const EDUCATION = [
  {
    degree: "B.Tech, Computer Science and Engineering",
    school: "Akshaya College of Engineering and Technology, Coimbatore",
    period: "2021 – 2025 · CGPA 7.93",
  },
  {
    degree: "Intermediate, MPC",
    school: "Citadel Residential School, Ranni",
    period: "2019 – 2021 · 75%",
  },
];

const CERTS = [
  "Python Essentials – Cisco",
  "Python Basics – HackerRank",
  "Complete Data Analyst Bootcamp – Udemy",
  "Python: Mastering the Essentials – Cisco",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase mb-3">
          About
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-5">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-14">
          {PERSONAL_INFO.longBio}
        </p>

        {/* Skills */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground"
              >
                <tech.Icon
                  size={14}
                  className={tech.color ? undefined : "text-muted-foreground"}
                  color={tech.color}
                />
                {tech.name}
              </span>
            ))}
          </div>
        </Section>

        {PROJECTS.length > 0 && (
          <>
            {/* Projects */}
            <Section title="Projects">
              <div className="space-y-8">
                {PROJECTS.map((p) => (
                  <div key={p.name}>
                    <h3 className="text-base font-semibold text-foreground">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {p.stack}
                    </p>
                    <ul className="space-y-1.5">
                      {p.points.map((pt, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-muted-foreground/50 shrink-0">
                            —
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* Education */}
        <Section title="Education">
          <div className="space-y-5">
            {EDUCATION.map((e) => (
              <div key={e.degree}>
                <p className="text-sm font-medium text-foreground">{e.degree}</p>
                <p className="text-sm text-muted-foreground">{e.school}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{e.period}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section title="Certifications">
          <ul className="space-y-2">
            {CERTS.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50 shrink-0">—</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Contact */}
        <Section title="Get In Touch">
          <p className="text-foreground/80 mb-4 text-sm">
            I&apos;m open to data analyst roles, freelance projects, and
            collaborations. The best way to reach me is by email.
          </p>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 text-foreground font-medium border-b border-foreground/30 hover:border-foreground transition-colors pb-0.5"
          >
            {PERSONAL_INFO.email}
          </a>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}
