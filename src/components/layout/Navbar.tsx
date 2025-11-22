"use client";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import Lenis from "lenis";

type SectionMetrics = {
  top: number;
  height: number;
};

export default function Navbar() {
  const [hide, setHide] = useState(false);
  const [ctaMetrics, setCtaMetrics] = useState<SectionMetrics | null>(null);

  const hasSnappedRef = useRef(false);
  const lastIntentRef = useRef<number>(1);
  const isProgrammaticScrollRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);


  // Magnetic navigation motion values
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const navX = useSpring(magneticX, {
    stiffness: 260,
    damping: 30,
    mass: 0.4,
  });
  const navY = useSpring(magneticY, {
    stiffness: 260,
    damping: 30,
    mass: 0.4,
  });

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

  // Lightweight "magnetic" tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (event.clientX - innerWidth / 2) / innerWidth;
      const normalizedY = (event.clientY - innerHeight / 2) / innerHeight;
      const maxOffset = 16;

      magneticX.set(normalizedX * maxOffset);
      magneticY.set(normalizedY * maxOffset);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [magneticX, magneticY]);

  useLenis(
    (lenis) => {
      if (!lenis) return;
      lenisRef.current = lenis;

      const { scroll, direction, progress, velocity } = lenis;

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

      // 2. CONTINUOUS MOMENTUM SNAP
      const SNAP_START = 0.97;
      const ALREADY_THERE = 0.997;
      const VELOCITY_THRESHOLD = 3.0;

      const inSnapZone = progress >= SNAP_START && progress < ALREADY_THERE;
      const isMovingDownOrStopped =
        direction === 1 || (direction === 0 && lastIntentRef.current === 1);

      const isCoasting = Math.abs(velocity) < VELOCITY_THRESHOLD;

      // Prevent auto-snap from fighting manual nav clicks
      if (isProgrammaticScrollRef.current) {
        return;
      }

      if (inSnapZone && !hasSnappedRef.current && isMovingDownOrStopped) {
        if (isCoasting) {
          hasSnappedRef.current = true;
          lenis.scrollTo("bottom", {
            duration: 1.2,
            lock: true,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }

      if (direction === -1 && hasSnappedRef.current) {
        hasSnappedRef.current = false;
      }

      if (progress >= ALREADY_THERE && !hasSnappedRef.current) {
        hasSnappedRef.current = true;
      }
    },
    [ctaMetrics],
  );

  const handleNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    const lenis = lenisRef.current;
    const target = document.getElementById(sectionId);

    if (!lenis || !target) return;

    event.preventDefault();

    // Flag strictly prevents the useLenis hook from interfering
    isProgrammaticScrollRef.current = true;

    lenis.scrollTo(target, {
      // duration: 1.5 gives the exponential ease time to settle naturally
      duration: 1.5,
      // lock prevents user interaction from causing a "hard stop" mid-flight
      lock: true,
      force: true,
      // Standard Lenis Ease: Math.min ensures we don't return > 1
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => {
        isProgrammaticScrollRef.current = false;
      },
    });
  };

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

      <motion.div
        className="hidden gap-8 font-mono text-xs tracking-widest md:flex"
        style={{ x: navX, y: navY }}
      >
        {["WORK", "LAB", "ABOUT", "CONTACT"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="group relative overflow-hidden"
            onClick={(event) => handleNavClick(event, item.toLowerCase())}
          >
            <span className="block transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover:-translate-y-full">
              {item}
            </span>
            <span className="text-accent absolute top-0 left-0 block translate-y-full transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover:translate-y-0">
              {item}
            </span>
          </Link>
        ))}
      </motion.div>

      <div className="text-right font-mono text-xs">
        <span className="text-accent block animate-pulse">● AVAILABLE</span>
        <span className="opacity-60">FOR FREELANCE</span>
      </div>
    </motion.nav>
  );
}
