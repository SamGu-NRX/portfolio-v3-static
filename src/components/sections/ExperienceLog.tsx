"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const roles = [
  {
    company: "Stealth Startup",
    role: "Founding Engineer",
    period: "2023 — Present",
    desc: "Architecting the core NLP pipeline using PyTorch and FastAPI. Managed a team of 3 engineers.",
    tags: ["Python", "AI/ML", "Infrastructure"],
  },
  {
    company: "Research Lab (MIT)",
    role: "ML Researcher",
    period: "2021 — 2023",
    desc: "Published papers on Computer Vision optimization. Implemented novel algorithms in C++.",
    tags: ["C++", "Research", "Vision"],
  },
  {
    company: "Tech Giant Corp",
    role: "Fullstack Engineer",
    period: "2019 — 2021",
    desc: "Migrated legacy dashboard to React/Next.js, improving load times by 40%.",
    tags: ["React", "TypeScript", "Enterprise"],
  },
];

export default function ExperienceLog() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="text-foreground relative bg-neutral-950 px-6 py-32 md:px-12"
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-24 text-right">
          <h2 className="font-serif text-5xl">System Log</h2>
          <div className="mt-2 font-mono text-xs text-white/30">
            EXECUTION HISTORY
          </div>
        </div>

        <div className="relative space-y-24 border-l border-white/5 pl-8 md:pl-16">
          <motion.div
            style={{ height: lineHeight }}
            className="bg-accent absolute top-0 left-[-1px] z-10 w-[2px] origin-top"
          />

          {roles.map((role, index) => (
            <div key={role.company} className="group relative">
              <div className="bg-background group-hover:border-accent absolute top-2 -left-[39px] h-3 w-3 rounded-full border border-white/30 transition-all duration-300 group-hover:scale-150 md:-left-[71px]" />

              <div className="mb-4 flex flex-col justify-between md:flex-row md:items-baseline">
                <h3 className="group-hover:text-accent font-serif text-3xl transition-colors duration-300 md:text-4xl">
                  {role.company}
                </h3>
                <span className="font-mono text-sm text-white/40">
                  {role.period}
                </span>
              </div>

              <div className="md:grid md:grid-cols-12 md:gap-8">
                <div className="text-accent mb-2 font-mono text-xs tracking-widest uppercase md:col-span-3 md:mb-0">
                  {role.role}
                </div>
                <div className="md:col-span-9">
                  <p className="mb-6 max-w-2xl font-sans text-lg leading-relaxed text-white/70">
                    {role.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
