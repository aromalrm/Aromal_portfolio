import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PERSONAL_INFO, TECH_STACK } from "@/lib/data";
import { Database } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Aromal Ramesh — Data Analyst based in Bengaluru, India. Background, skills, projects, and education.",
};

const PROJECTS = [
  {
    name: "Food Delivery & Restaurant Analytics",
    stack: "Snowflake · dbt · Airflow · Power BI",
    points: [
      "Ingested order, delivery, and restaurant data on schedule using Apache Airflow ETL/ELT workflows",
      "Modeled raw event data into analytics-ready tables with dbt inside a Snowflake data warehouse",
      "Wrote SQL transformations for KPIs such as average delivery time, order value, cancellation rate, and peak-hour demand",
      "Built Power BI dashboards surfacing restaurant performance and delivery SLA trends",
    ],
  },
  {
    name: "Supply Chain & Inventory Operations Analytics",
    stack: "Google BigQuery · dbt · Airflow · Tableau",
    points: [
      "Orchestrated scheduled ELT workflows in Apache Airflow to load inventory, purchase order, and supplier data into BigQuery",
      "Modeled staging and reporting layers with dbt to produce clean, analytics-ready operations tables",
      "Wrote SQL to calculate inventory turnover, reorder points, stockout rates, and supplier lead times",
      "Built Tableau dashboards tracking stock levels and supply chain KPIs",
    ],
  },
];

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
                {tech.noLogo ? (
                  <Database size={14} className="text-muted-foreground" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tech.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 object-contain"
                  />
                )}
                {tech.name}
              </span>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="space-y-8">
            {PROJECTS.map((p) => (
              <div key={p.name}>
                <h3 className="text-base font-semibold text-foreground">
                  {p.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{p.stack}</p>
                <ul className="space-y-1.5">
                  {p.points.map((pt, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-muted-foreground/50 shrink-0">—</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

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
