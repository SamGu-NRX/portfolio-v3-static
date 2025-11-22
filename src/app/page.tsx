"use client";
import AboutTicker from "@/components/home/AboutTicker";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import PhotographyLab from "@/components/home/PhotographyLab";
import WorkTable from "@/components/home/WorkTable";

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <AboutTicker />
      <WorkTable />
      <PhotographyLab />
      <Footer />
    </main>
  );
}
