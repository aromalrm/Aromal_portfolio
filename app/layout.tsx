import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PERSONAL_INFO } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aromalramesh.dev";

export const metadata: Metadata = {
  title: {
    default: "Aromal Ramesh",
    template: "%s | Aromal Ramesh",
  },
  description:
    "Aromal Ramesh is a Data Analyst based in Bengaluru, India. Specializing in SQL, Python, Power BI, Tableau, Snowflake, and BigQuery. Turning raw data into actionable insights and dashboards.",
  keywords: [
    "Aromal Ramesh",
    "Data Analyst",
    "Data Analytics",
    "SQL",
    "Python",
    "Power BI",
    "Tableau",
    "Snowflake",
    "BigQuery",
    "ETL",
    "Data Analyst Bengaluru",
    "Data Analyst India",
    "Business Intelligence",
    "Portfolio",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: siteUrl }],
  creator: PERSONAL_INFO.name,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Aromal Ramesh | Data Analyst",
    description:
      "Data Analyst specializing in SQL, Python, Power BI & Tableau. Based in Bengaluru, India.",
    siteName: "Aromal Ramesh",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aromal Ramesh - Data Analyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aromal Ramesh | Data Analyst",
    description:
      "Data Analyst specializing in SQL, Python, Power BI & Tableau. Based in Bengaluru, India.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
