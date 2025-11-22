"use client";
import AboutTicker from "@/components/home/AboutTicker";
import Hero from "@/components/home/Hero";
import PhotographyLab from "@/components/home/PhotographyLab";
import WorkTable from "@/components/home/WorkTable";
import TechArsenal from "@/components/sections/TechArsenal";
import ExperienceLog from "@/components/sections/ExperienceLog";
import JournalPreview from "@/components/sections/JournalPreview";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-background min-h-screen">
      <Hero />
      <AboutTicker />
      <TechArsenal />
      <ExperienceLog />
      <WorkTable />
      <PhotographyLab />
      <JournalPreview />
      <Footer />
    </main>
  );
}
