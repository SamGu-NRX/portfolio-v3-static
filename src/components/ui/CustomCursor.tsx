"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-4 w-4 rounded-full bg-white mix-blend-difference"
      animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
    />
  );
}
