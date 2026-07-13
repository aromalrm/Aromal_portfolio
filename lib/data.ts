// ─────────────────────────────────────────────────────────────────────────────
// SITE DATA — Edit this file to customize all portfolio content
// ─────────────────────────────────────────────────────────────────────────────

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
// `icon` is a lucide-react icon name (see components/sections/TechStack.tsx
// for the name → component map). `color` tints the circle behind it.

export const TECH_STACK: TechItem[] = [
  { name: "Python", icon: "Code2", color: "#3776AB" },
  { name: "SQL", icon: "Database", color: "#4479A1" },
  { name: "Pandas", icon: "Table2", color: "#150458" },
  { name: "NumPy", icon: "Sigma", color: "#4DABCF" },
  { name: "PostgreSQL", icon: "Database", color: "#4169E1" },
  { name: "Tableau", icon: "BarChart3", color: "#E97627" },
  { name: "Power BI", icon: "PieChart", color: "#F2C811" },
  { name: "AWS", icon: "Cloud", color: "#FF9900" },
  { name: "Git", icon: "GitBranch", color: "#F05032" },
  { name: "FastAPI", icon: "Zap", color: "#009688" },
  { name: "Snowflake", icon: "Snowflake", color: "#29B5E8" },
  { name: "BigQuery", icon: "Database", color: "#669DF6" },
  { name: "Azure", icon: "CloudCog", color: "#0078D4" },
];

// Small icons for project tech badges — reuses the same icon/color
// defined in TECH_STACK so badges stay visually consistent.
function badge(name: string): TechItem {
  const match = TECH_STACK.find((t) => t.name === name);
  return match ?? { name, icon: "Code2", color: "#888888" };
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
// image: URL or /images/... ; leave undefined for a gradient placeholder.
// Only a "Code" link is shown (githubUrl).

export const PROJECTS: Project[] = [
  {
    id: "food-delivery-restaurant-analytics",
    name: "Food Delivery & Restaurant Analytics",
    description:
      "End-to-end analytics project on food delivery and restaurant data — cleaned and modeled order, delivery, and restaurant datasets, then built dashboards surfacing trends in order volume, delivery performance, and restaurant ratings to support data-driven decisions.",
    image: "/images/food-delivery-analytics.png",
    gradient: "linear-gradient(135deg, #7a1f1f 0%, #d97b3f 100%)",
    githubUrl: "https://github.com/aromalrm/Food-Delivery-and-Restaurant-Analytics",
    techStack: [
      badge("Python"),
      badge("SQL"),
      badge("Pandas"),
      badge("Power BI"),
      badge("Tableau"),
    ],
  },
  {
    id: "supply-chain-analytics",
    name: "Supply Chain Analytics",
    description:
      "Analyzed end-to-end supply chain data to uncover bottlenecks across procurement, inventory, and logistics. Built ETL workflows and interactive dashboards tracking key metrics like lead times, stock levels, and fulfillment performance.",
    image: "/images/supply-chain-analytics.jpg",
    gradient: "linear-gradient(135deg, #0b486b 0%, #3b8686 100%)",
    githubUrl: "https://github.com/aromalrm/Supply-Chain-Analytics",
    techStack: [
      badge("SQL"),
      badge("Python"),
      badge("Pandas"),
      badge("Power BI"),
      badge("PostgreSQL"),
    ],
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "opengradient",
    company: "OpenGradient",
    logo: "/images/logos/opengradient.png", // ← drop the logo file here
    role: "Blockchain Analyst Intern",
    period: "Dec 2024 – Feb 2026",
    location: "Remote",
    bullets: [
      "Performed daily testing of AI protocol functionality and on-chain behavior.",
      "Conducted product analysis on newly released features to assess performance and usability.",
      "Beta tested new product releases, surfacing bugs and feedback ahead of public rollout.",
      "Managed community engagement, supporting users and gathering feedback across channels.",
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
  /** lucide-react icon name (e.g. "Code2", "Database") */
  icon: string;
  /** hex color used to tint the icon / circle behind it */
  color?: string;
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

export interface ExperienceItem {
  id: string;
  company: string;
  /** path to a logo image (e.g. /images/logos/company.png); omit for no icon */
  logo?: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
}
