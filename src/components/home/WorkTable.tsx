"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Chronicle API",
    type: "Backend Architecture",
    year: "2024",
    img: "https://picsum.photos/800/1200?random=1",
  },
  {
    title: "Vogue Scandinavia",
    type: "Frontend Experience",
    year: "2023",
    img: "https://picsum.photos/800/1200?random=2",
  },
  {
    title: "Lumina Health",
    type: "Fullstack Application",
    year: "2023",
    img: "https://picsum.photos/800/1200?random=3",
  },
  {
    title: "Apex Finance",
    type: "Design System",
    year: "2022",
    img: "https://picsum.photos/800/1200?random=4",
  },
];

export default function WorkTable() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="relative border-t border-white/5 px-6 py-32 md:px-12"
      onMouseMove={handleMouseMove}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="font-serif text-5xl md:text-7xl">Selected Works</h2>
          <span className="text-accent font-mono">(04)</span>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
              className="group flex cursor-pointer flex-col items-baseline justify-between border-b border-white/10 py-12 transition-all duration-500 hover:border-white/30 md:flex-row"
            >
              <h3 className="font-serif text-3xl transition-transform duration-500 ease-out group-hover:translate-x-4 md:text-4xl">
                {project.title}
              </h3>
              <div className="mt-4 flex gap-12 md:mt-0">
                <span className="text-foreground/50 group-hover:text-foreground font-sans font-light transition-colors">
                  {project.type}
                </span>
                <span className="text-foreground/30 font-mono text-sm">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image Hover Effect */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x - 200, // Center the image roughly on cursor
              y: mousePos.y - 150,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 0.5,
            }}
            className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[300px] w-[400px] overflow-hidden rounded-sm md:block"
          >
            <div className="bg-muted relative h-full w-full">
              <div className="bg-accent absolute inset-0 opacity-20 mix-blend-multiply"></div>
              {projects[activeProject].img ? (
                <Image
                  src={projects[activeProject].img as string}
                  fill
                  alt="Project"
                  className="object-cover"
                />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
