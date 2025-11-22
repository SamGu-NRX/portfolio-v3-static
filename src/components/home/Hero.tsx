"use client";
import { motion } from "framer-motion";

// Helper animation variants from implementation.md
const wordAnimation = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      delay: i * 0.1,
      duration: 1,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  return (
    <section className="flex h-screen w-full flex-col justify-end px-6 pb-32 md:px-12">
      <div className="text-muted mb-12 flex justify-between border-t border-white/20 pt-6 font-mono text-xs">
        <span>FULLSTACK / DESIGN</span>
        <span>SCROLL TO COMPILE ↓</span>
      </div>

      <div className="overflow-hidden">
        <motion.h1
          initial="hidden"
          animate="visible"
          className="fluid-heading text-foreground font-serif font-light"
        >
          {["DIGITAL", "CRAFTSMAN", "& OPTICAL", "ENGINEER"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                custom={i}
                variants={wordAnimation}
                className="block"
              >
                {word}
              </motion.span>
            </div>
          ))}
        </motion.h1>
      </div>
    </section>
  );
}
