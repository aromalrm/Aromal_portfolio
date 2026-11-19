// ─────────────────────────────────────────────────────────────────────────────
// SITE DATA — Edit this file to customize all portfolio content
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from "react";
import {
  SiPython,
  SiPostgresql,
  SiGit,
  SiFastapi,
  SiSnowflake,
} from "react-icons/si";
import { Database, Cloud, PieChart } from "lucide-react";

// ─── PERSONAL INFO ────────────────────────────────────────────────────────────

export const PERSONAL_INFO = {
  name: "Aromal Ramesh",
  initials: "AR",
  title: "GTM Engineer",
  location: "Bengaluru, India",
  email: "aaromalrm@gmail.com", // ← change to aaromalr7@gmail.com if that's the correct one
  phone: "+91 97478 87161",
  pronouns: "he/him",

  // Bio shown under the name on the home page
  bio: "Aspiring AI engineer building fun, experimental projects at the intersection of AI and data. I also work across data science—collecting, cleaning, and analyzing data to uncover trends, build dashboards, and turn numbers into insights that matter.",

  // Longer bio for the About page
  longBio:
    "Data Analyst based in Bengaluru, India. Data-driven graduate building ETL/ELT pipelines, writing SQL queries, and developing Python-based workflows for data cleaning, transformation, and analysis. Skilled at turning structured and unstructured data into actionable insights and dashboards using tools such as Power BI, Tableau, dbt, and Snowflake.",

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
    href: "https://x.com/AromalRm7",
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
  title: "Apna Time Ayega",
  artist: "Gully Boy",
  url: "https://open.spotify.com/", // ← put a real track URL, or leave the API to fill it
};

// ─── TECH STACK ───────────────────────────────────────────────────────────────
// Icon: a local SVG path or react-icons/lucide-react component.
// SVGL assets are used where the logo is available; the component fallback
// remains for technologies without an SVGL catalog entry.

export const TECH_STACK: TechItem[] = [
  { name: "Python", Icon: SiPython, color: "#3776AB", icon: "/images/tech/python.svg" },
  { name: "SQL", Icon: Database, generic: true, icon: "/images/tech/sql-server.svg" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", icon: "/images/tech/postgresql.svg" },
  { name: "Power BI", Icon: PieChart, generic: true, icon: "/images/tech/power-bi.svg" },
  { name: "AWS", Icon: Cloud, generic: true, icon: "/images/tech/aws.svg" },
  { name: "Git", Icon: SiGit, color: "#F03C2E", icon: "/images/tech/git.svg" },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688", icon: "/images/tech/fastapi.svg" },
  { name: "Snowflake", Icon: SiSnowflake, color: "#29B5E8" },
];

// Small icons for project tech badges
const badge = (name: string, Icon: IconComponent, color?: string): TechItem => ({
  name,
  Icon,
  color,
});

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
// image: URL or /images/... ; leave undefined for a gradient placeholder.
// Only a "Code" link is shown (githubUrl).

export const PROJECTS: Project[] = [
  {
    id: "aarogya",
    name: "Aarogya",
    url: "aarogya-health-eight.vercel.app",
    description:
      "Voice-first healthcare access platform for clinics, using AI and WhatsApp agents to handle calls, bookings, reminders, and patient questions.",
    image: "/images/aarogya.jpg",
    status: "Active",
    techStack: [],
  },
  {
    id: "rightway",
    name: "RightWay",
    url: "rightway-dusky.vercel.app",
    description:
      "Claims intelligence platform that surfaces critical details across complex case files, timelines, documents, and signals.",
    image: "/images/rightway.jpg",
    status: "Building",
    techStack: [],
  },
  {
    id: "skinscan",
    name: "SkinScan",
    url: "skinscan-fawn.vercel.app",
    description:
      "AI dermatology assistant for checking visible skin concerns, moles, rashes, acne, eczema, and other skin conditions.",
    image: "/images/skinscan.jpg",
    status: "Building",
    techStack: [],
  },
];

// ─── QUOTE ────────────────────────────────────────────────────────────────────

export const QUOTE = {
  text: "Bravery is not having no fear — it's having fear and still doing it anyway.",
  author: "Chris Williamson",
};

// ─── TYPES ────────────────────────────────────────────────────────────────────

// Plain callable type (not React.ComponentType) so both react-icons functions
// and lucide-react's ForwardRefExoticComponent structurally match — comparing
// against ComponentType trips on their differing/absent propTypes shapes.
export type IconComponent = (props: {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}) => ReactNode;

export interface TechItem {
  name: string;
  Icon: IconComponent;
  color?: string; // brand hex; omitted → adapts to the current text color
  generic?: boolean; // true for glyphs standing in for a brand with no icon
  icon?: string; // local SVG asset from SVGL
}

export interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  image?: string;
  gradient?: string;
  githubUrl?: string;
  status?: "Active" | "Building";
  techStack: TechItem[];
}
