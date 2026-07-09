// ─────────────────────────────────────────────────────────────────────────────
// SITE DATA — Edit this file to customize all portfolio content
// ─────────────────────────────────────────────────────────────────────────────

// Simple Icons CDN helper. Pass a color (hex without #, or "white") for
// logos whose brand color is too dark to read on a dark background.
const si = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const PERSONAL_INFO = {
  name: "Aromal Ramesh",
  initials: "AR",
  title: "Data Analyst",
  location: "Bengaluru, India",
  email: "aaromalrm@gmail.com", // ← change to aaromalr7@gmail.com if that's the correct one
  phone: "+91 97478 87161",
  pronouns: "he/him",

  // Bio shown under the name on the home page
  bio: "I turn raw data into clear, actionable insights—collecting, cleaning, and analyzing data to uncover trends, build interactive dashboards, and support confident, data-driven decisions. I focus on accurate reporting and meaningful analysis that drives real business impact.",

  // Longer bio for the About page
  longBio:
    "Data Analyst based in Bengaluru, India. Data-driven graduate with hands-on project experience building ETL/ELT pipelines, writing SQL queries, and developing Python-based workflows for data cleaning, transformation, and analysis. Skilled at turning structured and unstructured data into actionable insights and dashboards using tools such as Power BI, Tableau, dbt, and Snowflake.",

  availableForWork: true,
};

// ─── SOCIAL LINKS (rendered as icon-only buttons) ─────────────────────────────
// id maps to a lucide icon in the components. Update the href values.

export const SOCIAL_LINKS = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/aromalrm", // ← update
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/aromal-ramesh", // ← update
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    href: "https://x.com/aromalramesh", // ← update
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:aaromalrm@gmail.com",
  },
];

// ─── SPOTIFY ──────────────────────────────────────────────────────────────────
// Fallback track shown before/if the Spotify API is connected.
// See README "Spotify Integration" to wire up your real recently-played track.

export const SPOTIFY_FALLBACK = {
  title: "Midnight City",
  artist: "M83",
  url: "https://open.spotify.com/", // ← put a real track URL, or leave the API to fill it
};

// ─── TECH STACK ───────────────────────────────────────────────────────────────
// icon: a Simple Icons URL. mono: true → adaptive white/black (dark brand colors).
// noLogo: true → no brand logo exists (rendered with a database glyph).

export const TECH_STACK: TechItem[] = [
  { name: "Python", icon: si("python") },
  { name: "SQL", icon: "", noLogo: true },
  { name: "Pandas", icon: si("pandas"), mono: true },
  { name: "NumPy", icon: si("numpy"), mono: true },
  { name: "PostgreSQL", icon: si("postgresql") },
  { name: "Tableau", icon: si("tableau") },
  { name: "Power BI", icon: si("powerbi") },
  { name: "AWS", icon: si("amazonwebservices"), mono: true },
  { name: "Git", icon: si("git") },
  { name: "FastAPI", icon: si("fastapi") },
  { name: "Snowflake", icon: si("snowflake") },
  { name: "BigQuery", icon: si("googlebigquery") },
  { name: "Azure", icon: si("microsoftazure") },
];

// Small icons for project/experience tech badges
const badge = (name: string, slug: string, color?: string): TechItem => ({
  name,
  icon: si(slug, color),
});

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
// image: URL or /images/... ; leave undefined for a gradient placeholder.
// Only a "Code" link is shown (githubUrl).

export const PROJECTS: Project[] = [
  {
    id: "daydream",
    name: "Daydream",
    url: "daydream.ing",
    description:
      "Conversational AI fashion discovery platform. Analyzed user search behavior and catalog data to surface conversion insights, built reporting on query intent, and shaped ranking metrics across thousands of brand catalogs.",
    image: undefined,
    gradient: "linear-gradient(135deg, #2b1055 0%, #7597de 100%)",
    githubUrl: "https://github.com/aromalrm", // ← update
    techStack: [
      badge("Python", "python"),
      badge("SQL", "postgresql"),
      badge("Pandas", "pandas", "ffffff"),
      badge("BigQuery", "googlebigquery"),
      badge("Tableau", "tableau"),
    ],
  },
  {
    id: "cometly",
    name: "Cometly",
    url: "cometly.com",
    description:
      "Marketing attribution analytics platform. Modeled multi-touch attribution and built dashboards tying ad spend to revenue, analyzing millions of server-side events to measure campaign ROI and channel performance.",
    image: undefined,
    gradient: "linear-gradient(135deg, #0b486b 0%, #3b8686 100%)",
    githubUrl: "https://github.com/aromalrm", // ← update
    techStack: [
      badge("SQL", "postgresql"),
      badge("Snowflake", "snowflake"),
      badge("Python", "python"),
      badge("Power BI", "powerbi"),
      badge("Azure", "microsoftazure"),
    ],
  },
];

// ─── QUOTE ────────────────────────────────────────────────────────────────────

export const QUOTE = {
  text: "Bravery is not having no fear — it's having fear and still doing it anyway.",
  author: "Chris Williamson",
};

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface TechItem {
  name: string;
  icon: string;
  mono?: boolean;
  noLogo?: boolean;
}

export interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  image?: string;
  gradient?: string;
  githubUrl?: string;
  techStack: TechItem[];
}
