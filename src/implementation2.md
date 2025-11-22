This is a massive expansion. We are taking the "Darkroom Terminal" concept and pushing it into **High-Fidelity Editorial** territory.

We will add:

1.  **The "Arsenal" (Tech Stack):** A 3D floating schematic of your skills, not a boring list.
2.  **The "Log" (Experience/Resume):** A timeline that mimics a Git commit history / System Log.
3.  **The "Blueprint" (Project Template):** A reusable page for case studies that looks like an architectural diagram mixed with a code review. THIS WILL BE IMPLEMENTED
4.  **The "Journal" (Blog):** A minimalist, typography-led reading experience.

---

### 1. New Global Components (The Building Blocks)

First, let's create a sophisticated "Reveal" wrapper and a "Code Block" component that we will use in the case studies.

**`src/components/ui/TextReveal.tsx`**
_Rationale: Standard text fading is boring. This splits text into words/lines and reveals them with a fluid stagger._

```tsx
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = children.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.02,
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
```

**`src/components/ui/ElegantCode.tsx`**
_Rationale: A code block that looks like a piece of art._

```tsx
export default function ElegantCode({
  code,
  lang = "typescript",
}: {
  code: string;
  lang?: string;
}) {
  return (
    <div className="group relative my-12 overflow-hidden rounded-sm border border-white/10 bg-[#0f0f11]">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2">
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-white/20" />
          <div className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
          {lang}
        </span>
      </div>
      <div className="overflow-x-auto p-6">
        <pre className="font-mono text-sm leading-relaxed text-white/70">
          <code>{code}</code>
        </pre>
      </div>
      {/* Glow Effect */}
      <div className="bg-accent/10 pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[100px]" />
    </div>
  );
}
```

---

### 2. The "Arsenal" (Skills Section)

**`src/components/sections/TechArsenal.tsx`**
_Rationale: We group skills by "Logic" (Backend/AI) and "Form" (Frontend). It uses a hover effect that dims everything else, focusing on the specific skill._

```tsx
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
    <section className="bg-background relative overflow-hidden border-t border-white/10 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <h2 className="mb-4 font-serif text-5xl md:text-7xl">The Arsenal</h2>
          <p className="text-accent font-mono text-sm tracking-widest uppercase">
            Tech Stack & Tooling
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-24">
          {stacks.map((stack, i) => (
            <div key={i} className="flex flex-col gap-6">
              <h3 className="mb-4 border-b border-white/10 pb-2 font-mono text-xs text-white/40">
                0{i + 1} // {stack.category}
              </h3>
              <div className="flex flex-col gap-3">
                {stack.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    onMouseEnter={() => setHovered(skill)}
                    onMouseLeave={() => setHovered(null)}
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

      {/* Background Decoration */}
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-3xl" />
    </section>
  );
}
```

---

### 3. The "Log" (Resume/Experience)

**`src/components/sections/ExperienceLog.tsx`**
_Rationale: This looks like a system log. It features a "current line" indicator that follows the scroll._

```tsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const roles = [
  {
    company: "Stealth Startup",
    role: "Founding Engineer",
    period: "2023 — Present",
    desc: "Architecting the core NLP pipeline using PyTorch and FastAPI. Managed a team of 3 engineers.",
    tags: ["Python", "AI/ML", "Infrastructure"],
  },
  {
    company: "Research Lab (MIT)",
    role: "ML Researcher",
    period: "2021 — 2023",
    desc: "Published papers on Computer Vision optimization. Implemented novel algorithms in C++.",
    tags: ["C++", "Research", "Vision"],
  },
  {
    company: "Tech Giant Corp",
    role: "Fullstack Engineer",
    period: "2019 — 2021",
    desc: "Migrated legacy dashboard to React/Next.js, improving load times by 40%.",
    tags: ["React", "TypeScript", "Enterprise"],
  },
];

export default function ExperienceLog() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="text-bone relative bg-neutral-950 px-6 py-32 md:px-12"
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-24 text-right">
          <h2 className="font-serif text-5xl">System Log</h2>
          <div className="mt-2 font-mono text-xs text-white/30">
            EXECUTION HISTORY
          </div>
        </div>

        <div className="relative space-y-24 border-l border-white/5 pl-8 md:pl-16">
          {/* The Progress Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="bg-accent absolute top-0 left-[-1px] z-10 w-[2px] origin-top"
          />

          {roles.map((role, i) => (
            <div key={i} className="group relative">
              {/* Node Dot */}
              <div className="bg-background group-hover:border-accent absolute top-2 -left-[39px] h-3 w-3 rounded-full border border-white/30 transition-all duration-300 group-hover:scale-150 md:-left-[71px]" />

              <div className="mb-4 flex flex-col justify-between md:flex-row md:items-baseline">
                <h3 className="group-hover:text-accent font-serif text-3xl transition-colors duration-300 md:text-4xl">
                  {role.company}
                </h3>
                <span className="font-mono text-sm text-white/40">
                  {role.period}
                </span>
              </div>

              <div className="gap-8 md:grid md:grid-cols-12">
                <div className="text-accent col-span-3 mb-2 font-mono text-xs tracking-widest uppercase md:mb-0">
                  {role.role}
                </div>
                <div className="col-span-9">
                  <p className="mb-6 max-w-2xl font-sans text-lg leading-relaxed text-white/70">
                    {role.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 4. The "Blueprint" (Project Detail Template)

**`src/app/work/[slug]/page.tsx`**
_Rationale: This is the heavy lifter. It needs to convince the viewer you are a serious engineer. It includes a "System Architecture" visualization._

```tsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ElegantCode from "@/components/ui/ElegantCode";
import TextReveal from "@/components/ui/TextReveal";
import Footer from "@/components/Footer"; // Assuming previous footer exists

// Mock Data (Would be fetched properly)
const projectData = {
  title: "Chronicle API",
  tagline: "A high-throughput event sourcing engine",
  year: "2024",
  role: "Lead Architect",
  stack: ["Rust", "Kafka", "Postgres", "Next.js"],
  challenge:
    "We needed to process 50k events per second while maintaining strict causal ordering. Traditional REST architectures introduced too much latency.",
  solution:
    "I implemented a CQRS pattern using Rust for the write-model and a Node.js read-model. This separated concerns and allowed independent scaling.",
  snippet: `
impl EventStore for PostgresStore {
    async fn append(&self, stream: &str, events: &[Event]) -> Result<()> {
        let mut tx = self.pool.begin().await?;
        for event in events {
            sqlx::query!("INSERT INTO events ...")
                .execute(&mut tx)
                .await?;
        }
        tx.commit().await?;
        Ok(())
    }
}`,
};

export default function ProjectPage() {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main className="bg-background selection:bg-accent min-h-screen selection:text-white">
      {/* Navigation Back */}
      <nav className="fixed top-0 left-0 z-50 p-8 mix-blend-difference">
        <Link
          href="/"
          className="hover:text-accent group flex items-center gap-2 font-mono text-xs tracking-widest text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          RETURN TO TERMINAL
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 bg-neutral-900"
        >
          {/* Placeholder for Project Image */}
          <div className="h-full w-full bg-[url('https://picsum.photos/seed/tech/1920/1080')] bg-cover bg-center opacity-40" />
        </motion.div>

        <div className="from-background via-background/50 absolute inset-0 bg-gradient-to-t to-transparent" />

        <div className="absolute bottom-0 left-0 z-10 w-full p-6 md:p-12">
          <motion.div style={{ y: textY }} className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h1 className="font-serif text-[clamp(3rem,8vw,8rem)] leading-none text-white">
                {projectData.title}
              </h1>
              <div className="text-accent border-accent/30 flex gap-4 rounded-full border px-4 py-2 font-mono text-xs">
                {projectData.year} — {projectData.role}
              </div>
            </div>
            <div className="mb-8 h-[1px] w-full bg-white/20" />
            <div className="flex gap-6 font-mono text-xs tracking-widest text-white/60 uppercase">
              {projectData.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-32">
        {/* The Challenge */}
        <div className="mb-32">
          <h3 className="text-accent mb-8 font-mono text-xs">
            (01) THE CHALLENGE
          </h3>
          <TextReveal className="font-serif text-3xl leading-tight text-white/90 md:text-4xl">
            {projectData.challenge}
          </TextReveal>
        </div>

        {/* System Architecture Diagram (CSS Art) */}
        <div className="relative mb-32 overflow-hidden border border-white/10 bg-white/[0.02] p-12">
          <h3 className="mb-12 text-center font-mono text-xs text-white/40">
            SYSTEM ARCHITECTURE
          </h3>

          <div className="flex items-center justify-center gap-12 text-center font-mono text-[10px] text-white/70 uppercase md:gap-24">
            <div className="flex flex-col items-center gap-4">
              <div className="border-accent bg-accent/10 flex h-24 w-24 items-center justify-center rounded-full border">
                Client
              </div>
              <div className="h-12 w-[1px] bg-white/20" />
            </div>
            <div className="mt-24 flex flex-col items-center gap-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-sm border border-white">
                Load Balancer
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/50">
                API Nodes
              </div>
              <div className="h-12 w-[1px] bg-white/20" />
            </div>
          </div>

          {/* Animated particles */}
          <div className="pointer-events-none absolute inset-0">
            <div className="bg-accent absolute top-1/2 left-1/4 h-2 w-2 animate-ping rounded-full" />
          </div>
        </div>

        {/* The Solution & Code */}
        <div className="mb-32">
          <h3 className="text-accent mb-8 font-mono text-xs">(02) THE LOGIC</h3>
          <p className="mb-8 font-sans text-lg leading-relaxed text-white/70">
            {projectData.solution}
          </p>
          <ElegantCode code={projectData.snippet} lang="rust" />
        </div>

        {/* Next Project */}
        <div className="flex justify-end border-t border-white/10 pt-24">
          <Link href="#" className="group text-right">
            <span className="mb-2 block font-mono text-xs text-white/40">
              NEXT CASE STUDY
            </span>
            <span className="group-hover:text-accent font-serif text-4xl transition-colors md:text-6xl">
              Lumina Health →
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
```

---

### 5. The "Journal" (Blog Section)

**`src/app/journal/page.tsx`**
_Rationale: Very minimalist. Focus on typography. Hovering reveals a subtle distortion or abstract shape._

```tsx
"use client";
import Link from "next/link";
import { motion } from "motion/react";

const posts = [
  {
    title: "The Ethics of Computer Vision",
    date: "NOV 2024",
    readTime: "5 MIN",
    category: "AI/ML",
  },
  {
    title: "Why I Chose Rust for Web",
    date: "OCT 2024",
    readTime: "8 MIN",
    category: "ENGINEERING",
  },
  {
    title: "Design Systems as Infrastructure",
    date: "AUG 2024",
    readTime: "4 MIN",
    category: "DESIGN",
  },
  {
    title: "Optimizing Docker Builds",
    date: "JUL 2024",
    readTime: "6 MIN",
    category: "DEVOPS",
  },
];

export default function Journal() {
  return (
    <main className="bg-background min-h-screen px-6 pt-40 pb-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
          <h1 className="font-serif text-6xl md:text-8xl">Journal</h1>
          <p className="hidden max-w-xs text-right font-mono text-xs text-white/50 md:block">
            NOTES ON ENGINEERING, DESIGN, AND ARTIFICIAL INTELLIGENCE.
          </p>
        </div>

        <div className="flex flex-col">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={`/journal/${i}`}
              className="group relative border-b border-white/10 py-12 transition-colors hover:bg-white/[0.02]"
            >
              <div className="relative z-10 flex flex-col justify-between md:flex-row md:items-center">
                <div className="flex flex-col gap-2">
                  <span className="text-accent mb-2 font-mono text-[10px] tracking-widest uppercase">
                    {post.category}
                  </span>
                  <h2 className="font-serif text-3xl text-white/90 transition-colors group-hover:text-white md:text-5xl">
                    {post.title}
                  </h2>
                </div>

                <div className="mt-4 flex items-center gap-8 font-mono text-xs text-white/40 group-hover:text-white/60 md:mt-0">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Hover Reveal Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="from-accent/20 pointer-events-none absolute top-1/2 right-20 h-32 w-64 -translate-y-1/2 rounded-full bg-gradient-to-r to-transparent opacity-0 blur-2xl group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
```

---

### 6. Integrating into Main Page

Update your **`src/app/page.tsx`** to include the new sections.

```tsx
import HeroSection from "@/components/HeroSection"; // Your existing hero
import TechArsenal from "@/components/sections/TechArsenal";
import ExperienceLog from "@/components/sections/ExperienceLog";
import SelectedWork from "@/components/sections/SelectedWork"; // Existing work section
import JournalPreview from "@/components/sections/JournalPreview"; // Optional small preview
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen w-full">
      {/* ... Hero ... */}
      <TechArsenal /> {/* New */}
      <ExperienceLog /> {/* New */}
      {/* ... Work ... */}
      {/* ... Photography ... */}
      <Footer />
    </main>
  );
}
```

### How to Polish This (The "Awwwards" Checklist)

1.  **The "Load"**: Ensure you keep the `Lenis` smooth scroll. It makes the "Experience Log" line growth feel incredible.
2.  **Typography**: The mix of `Fraunces` (Editorial) and `JetBrains Mono` (Code) is vital. Ensure the CSS variable fonts are loaded correctly in `layout.tsx`.
3.  **Grain**: Don't forget the global noise overlay.
4.  **Images**: In the `ProjectPage`, use high-quality, possibly slightly desaturated or dimmed images so the text pops. Use CSS `mix-blend-mode: overlay` on images to blend them into the dark background.

This expansion creates a site that feels like a **digital magazine for a hacker**. It respects the engineering craft (via the Arsenal and Log) while maintaining the artistic integrity of the design.
