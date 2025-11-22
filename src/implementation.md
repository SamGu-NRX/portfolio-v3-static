This is a comprehensive implementation of a high-end, Awwwards-tier portfolio.

We are building **"The Darkroom Terminal."**
The concept merges the precision of engineering (grid lines, monospace data, terminal aesthetics) with the fluidity of photography (grain, blur, analog serif typography, smooth inertia).

### Tech Stack Prerequisites

- **Next.js 14+ (App Router)**
- **Tailwind CSS**
- **Framer Motion** (Complex animation orchestration)
- **Lenis** (Luxurious smooth scrolling)
- **clsx / tailwind-merge** (Class management)

---

### 1. The Aesthetic Engine (Global CSS & Config)

We don't use standard shadows. We use **noise, blurring, and blending modes**.

**`tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // "Void" - A warm, ink-like black, not #000
        background: "#09090b",
        // "Paper" - Slightly textured off-white for high contrast
        foreground: "#e4e4e7",
        // "Clay" - The primary accent, reminiscent of darkroom chemicals/safe lights
        accent: "#c2410c",
        // "Graphite" - Secondary UI elements
        muted: "#27272a",
      },
      fontFamily: {
        // Editorial serif (Download 'Fraunces' or 'Ogg')
        serif: ["var(--font-serif)", "serif"],
        // Clean geometric sans (Download 'Geist' or 'Montreal')
        sans: ["var(--font-sans)", "sans-serif"],
        // Technical mono (Download 'JetBrains Mono')
        mono: ["var(--font-mono)", "monospace"],
      },
      cursor: {
        none: "none",
      },
    },
  },
  plugins: [],
};
export default config;
```

**`src/app/globals.css`**
_Crucial for the "Non-AI" look. We add grain and remove default scrollbars._

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --cursor-size: 20px;
}

body {
  background-color: #09090b;
  color: #e4e4e7;
  cursor: none; /* We build a custom cursor */
  overflow-x: hidden;
}

/* The Film Grain Texture - Essential for "Texture" */
.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Typography Utility */
.fluid-heading {
  font-size: clamp(3rem, 8vw, 10rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
}
```

---

### 2. The Core Layout & Smooth Scroll

**`src/app/layout.tsx`**
Setup for smooth scroll and the custom cursor context.

```tsx
import type { Metadata } from "next";
import { Fraunces, GeistSans, JetBrains_Mono } from "next/font/google"; // Pseudo-code imports
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  axes: ["SOFT", "WONK"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "ATLAS // Design Engineer",
  description: "The intersection of logic and light.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body className="bg-background selection:bg-accent antialiased selection:text-black">
        <div className="noise-overlay" />
        <CustomCursor />

        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

---

### 3. Special Components (The "Wow" Factors)

#### **A. The Magnetic Navigation (Minimalist)**

_Why:_ Standard navbars are boring. This one tracks the mouse slightly and feels physical.

**`src/components/layout/Navbar.tsx`**

```tsx
"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
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
```

#### **B. The Custom Cursor (Context Aware)**

_Why:_ It replaces the standard pointer with a blend-mode circle that expands when hovering specific elements.

**`src/components/ui/CustomCursor.tsx`**

```tsx
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
```

---

### 4. The Main Page (The Experience)

This page orchestrates the story. It's broken into three key "acts": The Statement, The Logic (Code), and The Light (Photo).

**`src/app/page.tsx`**

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

// Helper animation variants
const wordAnimation = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { delay: i * 0.1, duration: 1, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function Home() {
  const container = useRef(null);

  return (
    <main ref={container} className="relative w-full">
      <HeroSection />
      <AboutTicker />
      <SelectedWork />
      <PhotographyLab />
      <Footer />
    </main>
  );
}

// --- SUB-COMPONENTS (Usually in separate files, combined here for full context) ---

function HeroSection() {
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

function AboutTicker() {
  return (
    <section className="bg-muted/5 w-full overflow-hidden border-y border-white/10 py-32">
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

function SelectedWork() {
  const projects = [
    {
      name: "VANGUARD",
      category: "Fintech Core",
      stack: "React / Rust / WebGL",
    },
    {
      name: "LUMEN ARCHIVES",
      category: "Editorial Platform",
      stack: "Next.js / Sanity",
    },
    { name: "AETHER", category: "AI Interface", stack: "OpenAI / Tailwind" },
  ];

  return (
    <section id="work" className="relative min-h-screen px-6 py-40 md:px-12">
      <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="text-accent font-mono text-sm md:col-span-4">
          (01) SELECTED WORKS
        </div>
        <div className="font-serif text-4xl leading-tight md:col-span-8">
          I build applications that feel like{" "}
          <span className="text-accent italic">objects</span>. Dense, tactile,
          and responsive.
        </div>
      </div>

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group flex flex-col items-baseline justify-between border-t border-white/20 px-4 py-16 transition-colors hover:bg-white/5 md:flex-row"
          >
            <h3 className="font-serif text-5xl transition-transform duration-500 group-hover:translate-x-4 md:text-8xl">
              {project.name}
            </h3>
            <div className="mt-4 flex flex-col items-end md:mt-0">
              <span className="text-accent font-mono text-xs uppercase">
                {project.category}
              </span>
              <span className="font-sans text-sm text-white/50">
                {project.stack}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PhotographyLab() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

  return (
    <section
      ref={targetRef}
      className="text-background relative h-[300vh] bg-[#EAE9E5]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-12 left-12 z-10 mix-blend-multiply">
          <h2 className="text-accent font-serif text-6xl md:text-8xl">
            The Darkroom
          </h2>
          <p className="mt-4 max-w-sm font-mono text-sm text-black/60">
            Photography is my practice of slowing down. <br />
            Analog only. No edits.
          </p>
        </div>

        <motion.div style={{ x }} className="flex gap-12 pl-[30vw]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="relative flex h-[60vh] w-[40vw] shrink-0 rotate-1 flex-col bg-black p-4 pb-12 shadow-2xl shadow-black/30 transition-transform duration-500 hover:rotate-0 md:w-[25vw]"
            >
              {/* Image Placeholder */}
              <div className="relative h-full w-full overflow-hidden bg-neutral-800 grayscale transition-all duration-700 hover:grayscale-0">
                <Image
                  src={`https://picsum.photos/800/1200?random=${i}`} // Replace with your real photos
                  alt="Analog Photography"
                  fill
                  className="object-cover"
                />
                {/* Film Dust Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/dust-overlay.png')] opacity-20"></div>
              </div>
              <div className="mt-4 flex justify-between font-mono text-[10px] tracking-widest text-white uppercase">
                <span>Fuji Superia 400</span>
                <span>Tokyo, JP</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background relative z-10 flex h-screen flex-col justify-between p-12">
      <div className="flex items-start justify-between">
        <span className="font-serif text-2xl">ATLAS</span>
        <div className="text-accent flex gap-4 font-mono text-xs">
          <a href="#">TWITTER / X</a>
          <a href="#">GITHUB</a>
          <a href="#">LINKEDIN</a>
        </div>
      </div>

      <div className="text-center">
        <h2 className="fluid-heading hover:text-accent cursor-pointer font-serif leading-none transition-colors duration-500">
          <a href="mailto:hello@atlas.dev">SAY HELLO</a>
        </h2>
      </div>

      <div className="text-muted flex justify-between font-mono text-[10px] uppercase">
        <span>Based in Seattle</span>
        <span>Local Time: {new Date().toLocaleTimeString()}</span>
        <span>© 2024</span>
      </div>
    </footer>
  );
}
```

### 5. Implementation Details & Reasoning

1.  **Typography as Structure:**
    - We use **Fraunces (Serif)** for the "Human" elements (Headings, Photography, Voice) and **JetBrains Mono** for the "Machine" elements (Nav, Labels, Dates). This visually separates your dual personality.

2.  **Micro-Interactions:**
    - **`wordAnimation`:** The hero text doesn't just fade in; it slides up line-by-line with a sophisticated staggered ease. This signals "High Production Value" immediately.
    - **Sticky Horizontal Scroll (`PhotographyLab`):** Instead of a normal gallery, we use `useScroll` to transform vertical scroll into horizontal movement. This forces the user to slow down and look at the photos.

3.  **Colors & Texture:**
    - The background isn't `#000000`. It's `#09090b` (Zinc 950), which is warmer.
    - The **Noise Overlay** in `globals.css` is crucial. It stops the site from looking like a sterile Tailwind template and gives it "tooth" or "grain."

4.  **The Project List:**
    - We avoid "Card UI." Cards are cheap. A **List layout** is editorial and confident. It says, "My work speaks for itself; I don't need a thumbnail to convince you to click." (Though we could add a hover-reveal image easily).

### How to Launch This

1.  Run `npx create-next-app@latest`
2.  Install: `npm i motion/react @studio-freight/lenis clsx tailwind-merge`
3.  Copy the files exactly as structured above.
4.  Find a nice `noise.svg` or use the data-uri provided in the CSS.
5.  Replace the font imports with actual Google Font imports or local font files.

This code provides the **Skeleton of Luxury**. It is not bloated; it relies on spacing, typography, and timing—the three pillars of Awwwards design.
