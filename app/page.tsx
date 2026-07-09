import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ContributionGraph } from "@/components/sections/ContributionGraph";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Quote } from "@/components/sections/Quote";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <div className="divide-y divide-border">
          <ContributionGraph />
          <TechStack />
          <Projects />
          <Contact />
          <Quote />
        </div>
      </main>
      <Footer />
    </div>
  );
}
