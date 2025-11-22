"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";

type SectionMetrics = {
  top: number;
  height: number;
};

export default function Navbar() {
  const [hide, setHide] = useState(false);
  const [ctaMetrics, setCtaMetrics] = useState<SectionMetrics | null>(null);

  const hasSnappedRef = useRef(false);
  const lastIntentRef = useRef<number>(1);

  // Debug flag
  const DEBUG = false;

  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) return;

    const updateMetrics = () => {
      const rect = footer.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setCtaMetrics({
        top: rect.top + scrollTop,
        height: footer.offsetHeight,
      });
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  useLenis(
    (lenis) => {
      if (!lenis) return;

      const { scroll, direction, progress, velocity } = lenis;

      // 0. TRACK INTENT
      if (direction !== 0) lastIntentRef.current = direction;

      // 1. HIDE HEADER LOGIC
      if (ctaMetrics) {
        const viewportHeight = window.innerHeight;
        const scrollBottom = scroll + viewportHeight;
        const hideStart = ctaMetrics.top + ctaMetrics.height * 0.8;
        const hideEnd = ctaMetrics.top + ctaMetrics.height;
        const shouldHide =
          scrollBottom >= hideStart && scrollBottom <= hideEnd + 1;
        setHide((prev) => (prev !== shouldHide ? shouldHide : prev));
      }

      // ---------------------------------------------------------
      // 2. CONTINUOUS MOMENTUM SNAP
      // ---------------------------------------------------------
      const SNAP_START = 0.97;
      const ALREADY_THERE = 0.997;

      // We raise the threshold significantly (from 1 to 4).
      // This allows us to "catch" the scroll while it is still moving decently fast,
      // avoiding the feeling that the site forces you to stop before snapping.
      // However, we still ignore "violent" flicks (velocity > 4).
      const VELOCITY_THRESHOLD = 3.0;

      const inSnapZone = progress >= SNAP_START && progress < ALREADY_THERE;
      const isMovingDownOrStopped =
        direction === 1 || (direction === 0 && lastIntentRef.current === 1);

      // "Coasting" means moving at a moderate speed or stopped.
      const isCoasting = Math.abs(velocity) < VELOCITY_THRESHOLD;

      if (inSnapZone && !hasSnappedRef.current && isMovingDownOrStopped) {
        if (isCoasting) {
          if (DEBUG)
            console.log(
              `🧲 [Navbar] Coasting detected (${velocity.toFixed(2)}). Blending Snap.`,
            );

          hasSnappedRef.current = true;

          lenis.scrollTo("bottom", {
            // Duration: 1.2s is a sweet spot for "Expo" ease to feel expensive but not sluggish
            duration: 1.2,
            lock: true,

            // CRITICAL CHANGE: EaseOutExpo
            // 1. It starts FAST (matching your existing momentum).
            // 2. It decelerates smoothly to the bottom.
            // This avoids the "stop-then-start" jerkiness of EaseInOut curves.
            easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -8 * t)),

            onComplete: () => {
              if (DEBUG) console.log("🏁 [Navbar] Snap Complete");
            },
          });
        } else {
          // If velocity is HIGHER than 4, we assume you threw the scroll wheel hard.
          // We do nothing and let your natural physics hit the bottom.
          if (DEBUG && Math.random() > 0.9)
            console.log(
              `🏎️ [Navbar] High Momentum (${velocity.toFixed(2)}). Yielding.`,
            );
        }
      }

      // RESET: Only if user explicitly scrolls UP
      if (direction === -1 && hasSnappedRef.current) {
        hasSnappedRef.current = false;
      }

      // SAFETY: If physics carried us to the bottom, lock the state.
      if (progress >= ALREADY_THERE && !hasSnappedRef.current) {
        hasSnappedRef.current = true;
      }
    },
    [ctaMetrics],
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={hide ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-0 left-0 z-50 flex w-full items-start justify-between px-8 py-6 text-white mix-blend-difference"
    >
      <div className="flex flex-col">
        <span className="font-serif text-xl tracking-tight">ATLAS</span>
        <span className="font-mono text-[10px] opacity-60">EST. 1998</span>
      </div>

      <div className="hidden gap-8 font-mono text-xs tracking-widest md:flex">
        {["WORK", "LAB", "ABOUT", "CONTACT"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="group relative overflow-hidden"
          >
            <span className="block transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover:-translate-y-full">
              {item}
            </span>
            <span className="text-accent absolute top-0 left-0 block translate-y-full transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover:translate-y-0">
              {item}
            </span>
          </Link>
        ))}
      </div>

      <div className="text-right font-mono text-xs">
        <span className="text-accent block animate-pulse">● AVAILABLE</span>
        <span className="opacity-60">FOR FREELANCE</span>
      </div>
    </motion.nav>
  );
}
