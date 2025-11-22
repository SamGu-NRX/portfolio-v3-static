"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function TextReveal({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = children.split(" ");

  return (
    <p
      ref={ref}
      className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="block overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.02,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

