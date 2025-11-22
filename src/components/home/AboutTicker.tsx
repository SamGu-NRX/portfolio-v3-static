"use client";
import { motion } from "motion/react";

export default function AboutTicker() {
  return (
    <section
      id="about"
      className="bg-muted/5 w-full overflow-hidden border-y border-white/10 py-32"
    >
      <div className="flex gap-12 whitespace-nowrap">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center gap-12"
        >
          {/* Repeated 4 times for seamless loop */}
          {[1, 2, 3, 4].map((key) => (
            <h2
              key={key}
              className="cursor-default font-serif text-[6vw] text-white italic opacity-30 transition-opacity duration-500 hover:opacity-100"
            >
              Designing with logic — Building with emotion —
            </h2>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
