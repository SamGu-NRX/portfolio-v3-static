"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ProjectCaseStudy } from "@/content/projects";
import ElegantCode from "@/components/ui/ElegantCode";
import TextReveal from "@/components/ui/TextReveal";
import Footer from "@/components/Footer";
import RichMarkdown from "@/components/ui/RichMarkdown";

interface ProjectPageClientProps {
  project: ProjectCaseStudy;
  highlightedSnippetHtml: string;
}

export default function ProjectPageClient({
  project,
  highlightedSnippetHtml,
}: ProjectPageClientProps) {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main
      className={`bg-background selection:bg-accent min-h-screen selection:text-white`}
    >
      {/* Navigation Back */}
      <nav className="fixed top-0 left-0 z-50 p-8 mix-blend-difference">
        <Link
          href="/"
          className={`group hover:text-accent flex items-center gap-2 font-mono text-xs tracking-widest text-white transition-colors`}
        >
          <ArrowLeft
            className={`h-4 w-4 transition-transform group-hover:-translate-x-1`}
          />
          RETURN TO TERMINAL
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 bg-neutral-900"
        >
          {/* Project Image */}
          <div
            className="h-full w-full bg-cover bg-center opacity-40"
            style={{
              backgroundImage: `url('${project.heroImage}')`,
            }}
          />
        </motion.div>

        <div
          className={`from-background via-background/50 absolute inset-0 bg-gradient-to-t to-transparent`}
        />

        <div className={`absolute bottom-0 left-0 z-10 w-full p-6 md:p-12`}>
          <motion.div style={{ y: textY }} className="mx-auto max-w-7xl">
            <div
              className={`mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-end`}
            >
              <h1
                className={`font-serif text-[clamp(3rem,8vw,8rem)] leading-none text-white`}
              >
                {project.title}
              </h1>
              <div
                className={`border-accent/30 text-accent flex gap-4 rounded-full border px-4 py-2 font-mono text-xs`}
              >
                {project.year} — {project.role}
              </div>
            </div>
            <div className="mb-8 h-[1px] w-full bg-white/20" />
            <div
              className={`flex gap-6 font-mono text-xs tracking-widest text-white/60 uppercase`}
            >
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-32">
        {/* The Challenge */}
        <div className="mb-32">
          <h3 className="text-accent mb-8 font-mono text-xs">
            (01) THE CHALLENGE
          </h3>
          <TextReveal
            className={`font-serif text-3xl leading-tight text-white/90 md:text-4xl`}
          >
            {project.challenge}
          </TextReveal>
        </div>

        {/* System Architecture Diagram (CSS Art) */}
        <div
          className={`relative mb-32 overflow-hidden border border-white/10 bg-white/[0.02] p-12`}
        >
          <h3 className="mb-12 text-center font-mono text-xs text-white/40">
            SYSTEM ARCHITECTURE
          </h3>

          <div
            className={`flex items-center justify-center gap-12 text-center font-mono text-[10px] text-white/70 uppercase md:gap-24`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`border-accent bg-accent/10 flex h-24 w-24 items-center justify-center rounded-full border`}
              >
                Client
              </div>
              <div className="h-12 w-px bg-white/20" />
            </div>
            <div className="mt-24 flex flex-col items-center gap-4">
              <div
                className={`flex h-32 w-32 items-center justify-center rounded-sm border border-white`}
              >
                Load Balancer
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/50`}
              >
                API Nodes
              </div>
              <div className="h-12 w-px bg-white/20" />
            </div>
          </div>

          {/* Animated particles */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className={`bg-accent absolute top-1/2 left-1/4 h-2 w-2 animate-ping rounded-full`}
            />
          </div>
        </div>

        {/* The Solution & Code */}
        <div className="mb-32">
          <h3 className="text-accent mb-8 font-mono text-xs">(02) THE LOGIC</h3>
          <RichMarkdown
            content={project.solution}
            className={`space-y-4 font-sans text-lg leading-relaxed text-white/70`}
          />
          <ElegantCode
            highlightedHtml={highlightedSnippetHtml}
            lang={project.snippetLanguage}
          />
        </div>

        {/* Next Project */}
        <div className="flex justify-end border-t border-white/10 pt-24">
          <Link href="/#work" className="group text-right">
            <span className="mb-2 block font-mono text-xs text-white/40">
              BACK TO INDEX
            </span>
            <span
              className={`group-hover:text-accent font-serif text-4xl transition-colors md:text-6xl`}
            >
              Selected Works →
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
