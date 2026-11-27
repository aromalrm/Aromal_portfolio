import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ContributionGraph } from "@/components/sections/ContributionGraph";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Bookshelf } from "@/components/sections/Bookshelf";
import { Contact } from "@/components/sections/Contact";
import { Quote } from "@/components/sections/Quote";
import { GymCatFrame } from "@/components/sections/GymCatFrame";

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
          <Bookshelf />
          <Contact />
          <Quote />
        </div>
        <GymCatFrame />
      </main>
      <Footer />
    </div>
  );
}
