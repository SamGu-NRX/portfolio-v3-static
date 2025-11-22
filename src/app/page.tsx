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
    <main className="bg-background relative min-h-screen w-full">
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
