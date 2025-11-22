This is a comprehensive design and development plan for a portfolio that sits at the intersection of **High-End Editorial** and **Creative Engineering**.

We will move away from standard "SaaS" aesthetics (blue buttons, cards with drop shadows) and move toward **"Digital Tactility"**—a style that feels physical, printed, and cinematic.

---

# Phase 1: The Design Philosophy & Visual System

### **The Concept: "The Analog Terminal"**

We are blending the raw, structural nature of code (The Engineer) with the emotive, framing nature of photography (The Designer). The site will feel like a darkroom—atmospheric, granular, and fluid.

### **1. Typography Strategy**

We reject Inter and Roboto. We need fonts with high stroke contrast and personality.

- **Primary (Display):** _Fraunces_ (Google Font equivalent to Canela/Ogg). It has "Softness" axes that allow it to shift from rigid serif to groovy editorial.
- **Secondary (Body/UI):** _Manrope_. A geometric sans that is readable but modern.
- **Tertiary (Code/Meta):** _JetBrains Mono_. For small details (dates, tech stacks), grounding the engineering side.

### **2. Color Palette: "Developed Film"**

A dark, immersive theme that avoids "Pitch Black" in favor of deep organic tones.

- **Base:** `#0a0a09` (Void - Warmer than #000)
- **Surface:** `#1c1c1b` (Charcoal - for subtle depth)
- **Text Primary:** `#eae0d5` (Bone/Oat - easier on eyes than white)
- **Accent A:** `#cd4e2d` (Burnt Clay - energetic, warm)
- **Accent B:** `#5a6c56` (Film Green - muted, organic)

### **3. Texture & Atmosphere**

- **Grain:** A fixed SVG noise overlay over the entire viewport to simulate film stock.
- **Fluidity:** Lenis Smooth Scroll is mandatory for that "luxury" inertia.
- **Lighting:** CSS radial gradients that track the mouse subtly, acting as a flashlight in the darkroom.

---

# Phase 2: Technical Setup & Configuration

### **Step 1: Dependencies**

```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint
npm install motion/react @studio-freight/lenis clsx tailwind-merge lucide-react
```

### **Step 2: Tailwind Configuration (`tailwind.config.ts`)**

We define our fluid typography and color variables here.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a0a09",
        charcoal: "#1c1c1b",
        bone: "#eae0d5",
        clay: "#cd4e2d",
        moss: "#5a6c56",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        grain: "url('/noise.svg')", // You will need a simple svg noise pattern
      },
      animation: {
        "slow-spin": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
```

### **Step 3: Global CSS & Layout (`app/layout.tsx`)**

Here we inject the fonts, the noise overlay, and the smooth scroll context.

```tsx
import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll"; // We'll create this

// Typography selection - Vital for the aesthetic
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"], // Enabling variable font axes for character
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Architect of Light & Logic",
  description: "Design Engineer & Photographer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable} bg-void text-bone overflow-x-hidden`}
      >
        {/* Film Grain Overlay */}
        <div className="bg-grain pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"></div>

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

---

# Phase 3: Core Components (The Creative Implementation)

### **1. Smooth Scroll Wrapper (`components/SmoothScroll.tsx`)**

Awwwards sites _never_ use default browser scrolling.

```tsx
"use client";
import { ReactLenis } from "@studio-freight/lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

### **2. Hero Section: "Kinetic Typography"**

_Rationale:_ Instead of a photo of you, we use language as texture. The text reveals the duality of the persona. We use `motion/react` for a staggered reveal.

```tsx
"use client";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full flex-col justify-center overflow-hidden px-6 md:px-12">
      {/* Background Abstract Gradient - Adds Depth */}
      <div className="bg-clay/10 absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full blur-[120px]" />

      <div className="z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="bg-clay h-[1px] w-12" />
          <span className="text-clay font-mono text-sm tracking-widest uppercase">
            Fullstack Design Engineer
          </span>
        </motion.div>

        <div className="flex flex-col">
          {["BUILDING", "DIGITAL", "CATHEDRALS"].map((word, i) => (
            <motion.h1
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.15,
              }}
              className="overflow-hidden font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.85] font-light tracking-tight"
            >
              <span className="block">{word}</span>
            </motion.h1>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <p className="text-bone/60 max-w-md font-sans text-lg leading-relaxed">
            Crafting pixel-perfect interfaces backed by robust architecture.
            Capturing moments of silence in between.
          </p>
          <div className="text-bone/40 grid grid-cols-2 gap-x-12 gap-y-2 font-mono text-xs">
            <span>LOC: CHICAGO, IL</span>
            <span>EXP: 6 YEARS</span>
            <span>STACK: NEXT.JS / GL / NODE</span>
            <span>AVAILABILITY: MAR 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### **3. The Work Gallery: "Interactive Table"**

_Rationale:_ Cards are generic. We will use a "List View" that feels like a table of contents in a magazine. Hovering a row reveals a floating image cursor, blending code (list) and design (image).

```tsx
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const projects = [
  {
    title: "Chronicle API",
    type: "Backend Architecture",
    year: "2024",
    img: "/api-abstract.jpg",
  },
  {
    title: "Vogue Scandinavia",
    type: "Frontend Experience",
    year: "2023",
    img: "/editorial-web.jpg",
  },
  {
    title: "Lumina Health",
    type: "Fullstack Application",
    year: "2023",
    img: "/app-ui.jpg",
  },
  {
    title: "Apex Finance",
    type: "Design System",
    year: "2022",
    img: "/design-sys.jpg",
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
          <span className="text-clay font-mono">(04)</span>
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
                <span className="text-bone/50 group-hover:text-bone font-sans font-light transition-colors">
                  {project.type}
                </span>
                <span className="text-bone/30 font-mono text-sm">
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
              stiffness: 150,
              damping: 15,
              mass: 0.5,
            }}
            className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[300px] w-[400px] overflow-hidden rounded-sm md:block"
          >
            {/*
              Note: In a real app, use Next/Image with object-cover.
              We use a colored div here for demo if no images exist.
            */}
            <div className="relative h-full w-full bg-neutral-800">
              <div className="bg-clay absolute inset-0 opacity-20 mix-blend-multiply"></div>
              {/* <Image src={projects[activeProject].img} fill alt="Project" className="object-cover" /> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

### **4. Photography Section: "The Scatter"**

_Rationale:_ Photography is the hobby, so it shouldn't look like the code work. It should feel loose. We use draggable motion elements to simulate prints on a desk.

```tsx
"use client";
import { motion } from "motion/react";
import { useRef } from "react";

const photos = [
  { id: 1, rotate: -6, z: 10 },
  { id: 2, rotate: 3, z: 20 },
  { id: 3, rotate: -3, z: 30 },
  { id: 4, rotate: 8, z: 40 },
];

export default function PhotographySection() {
  const containerRef = useRef(null);

  return (
    <section className="bg-charcoal relative overflow-hidden py-32">
      <div className="relative z-10 mx-auto mb-20 max-w-7xl px-6">
        <h2 className="mb-6 font-serif text-5xl md:text-6xl">Light Leaks</h2>
        <p className="text-bone/60 max-w-lg font-sans">
          A collection of captured moments. Analog 35mm.
          <br />
          Drag to explore the stack.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative flex h-[80vh] w-full items-center justify-center"
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            drag
            dragConstraints={containerRef}
            whileHover={{ scale: 1.05, cursor: "grab" }}
            whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 100 }}
            style={{
              rotate: photo.rotate,
              zIndex: photo.z,
            }}
            className="absolute flex h-80 w-64 flex-col bg-[#eae0d5] p-3 shadow-2xl shadow-black/50 md:h-[30rem] md:w-96"
          >
            {/* Photo Frame */}
            <div className="relative flex-grow overflow-hidden bg-neutral-900 grayscale transition-all duration-500 hover:grayscale-0">
              {/* Placeholder for image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black to-neutral-700 opacity-60"></div>
            </div>
            <div className="mt-2 flex h-8 items-end justify-between">
              <span className="font-mono text-[10px] tracking-widest text-black/60 uppercase">
                Kodak Portra 400
              </span>
              <span className="font-mono text-[10px] text-black/60">2024</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

### **5. Footer: "The Signature"**

Minimal, big type, clear call to action.

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-20 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between md:flex-row">
        <div>
          <h2 className="mb-8 font-serif text-4xl md:text-5xl">
            Let's create something
            <br />
            timeless.
          </h2>
          <a
            href="mailto:hello@example.com"
            className="border-clay hover:text-clay inline-block border-b pb-1 font-sans text-xl transition-colors md:text-2xl"
          >
            hello@architect.dev
          </a>
        </div>
        <div className="text-bone/40 mt-12 flex gap-8 font-mono text-sm md:mt-0">
          <a href="#" className="hover:text-bone transition-colors">
            GITHUB
          </a>
          <a href="#" className="hover:text-bone transition-colors">
            LINKEDIN
          </a>
          <a href="#" className="hover:text-bone transition-colors">
            ARE.NA
          </a>
        </div>
      </div>
      <div className="text-bone/20 mx-auto mt-24 max-w-7xl text-center font-mono text-xs uppercase md:text-left">
        © 2024 Portfolio. Built with Next.js & Tailwind.
      </div>
    </footer>
  );
}
```

---

# Phase 4: Assembly

**`app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import WorkTable from "@/components/WorkTable";
import PhotographySection from "@/components/PhotographySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-void selection:bg-clay min-h-screen w-full selection:text-white">
      <Hero />
      <WorkTable />
      <PhotographySection />
      <Footer />
    </main>
  );
}
```

# Phase 5: UX Detailing & "Wow" Factors

1.  **Magnetic Navigation:**
    Create a small, fixed navbar at the bottom center (not top) containing glassmorphic pill buttons. Top navs are expected; bottom navs feel app-like and modern.

2.  **Page Transitions:**
    Use a "curtain" effect using Framer Motion where a solid color (Clay or Moss) slides up to cover the screen on link click, then slides away on the new page.

3.  **The "Awwwards" Touch:**
    - **Preloader:** A simple counter (0% to 100%) in `JetBrains Mono` that centers on the screen, then splits horizontally to reveal the Hero.
    - **Parallax:** Use `useScroll` and `useTransform` from Framer Motion on the text in the About section so lines move at slightly different speeds, creating a 2.5D effect.

### **Why this design works:**

1.  **Typography-First:** By using _Fraunces_, we immediately separate from the sea of "Inter" portfolios. It feels editorial.
2.  **Color Theory:** The "Void" and "Bone" combo creates high contrast without eye strain, while "Clay" adds that specific warmth found in developed film photos.
3.  **Contextual Motion:** The code section uses structured lists (Logic), while the photo section uses draggable chaos (Art). The UI mirrors the persona's dual skill set.
4.  **No Templates:** Every component (the interactive list, the scatter gallery) is custom-built for this specific narrative.
