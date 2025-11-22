"use client";
import { motion } from "motion/react";
import { useState } from "react";

const stacks = [
  {
    category: "INTELLIGENCE",
    skills: [
      "PyTorch",
      "SciKit-Learn",
      "Computer Vision",
      "NLP",
      "NumPy",
      "Python",
    ],
  },
  {
    category: "ARCHITECTURE",
    skills: ["Docker", "PostgreSQL", "Node.js", "C++", "Java", "Git"],
  },
  {
    category: "INTERFACE",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "WebGL",
    ],
  },
];

export default function TechArsenal() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      className="bg-background relative overflow-hidden border-t border-white/10 px-6 py-32 md:px-12"
      onMouseLeave={() => setHovered(null)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <h2 className="mb-4 font-serif text-5xl md:text-7xl">The Arsenal</h2>
          <p className="text-accent font-mono text-sm tracking-widest uppercase">
            Tech Stack &amp; Tooling
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-24">
          {stacks.map((stack, index) => (
            <div key={stack.category} className="flex flex-col gap-6">
              <h3 className="mb-4 border-b border-white/10 pb-2 font-mono text-xs text-white/40">
                0{index + 1} // {stack.category}
              </h3>
              <div className="flex flex-col gap-3">
                {stack.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    onMouseEnter={() => setHovered(skill)}
                    animate={{
                      opacity: hovered ? (hovered === skill ? 1 : 0.2) : 1,
                      x: hovered === skill ? 10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="hover:text-accent cursor-pointer font-serif text-3xl transition-colors md:text-4xl"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-3xl" />
    </section>
  );
}
