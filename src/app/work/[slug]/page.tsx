"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ElegantCode from "@/components/ui/ElegantCode";
import TextReveal from "@/components/ui/TextReveal";
import Footer from "@/components/Footer";

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
  snippet: `impl EventStore for PostgresStore {
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
    <main className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <nav className="fixed left-0 top-0 z-50 p-8 mix-blend-difference">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-xs tracking-widest text-white transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          RETURN TO TERMINAL
        </Link>
      </nav>

      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 bg-neutral-900"
        >
          <div className="h-full w-full bg-[url('https://picsum.photos/seed/tech/1920/1080')] bg-cover bg-center opacity-40" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute bottom-0 left-0 z-10 w-full p-6 md:p-12">
          <motion.div style={{ y: textY }} className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h1 className="font-serif text-[clamp(3rem,8vw,8rem)] leading-none text-white">
                {projectData.title}
              </h1>
              <div className="flex gap-4 rounded-full border border-accent/30 px-4 py-2 font-mono text-xs text-accent">
                {projectData.year} — {projectData.role}
              </div>
            </div>
            <div className="mb-8 h-[1px] w-full bg-white/20" />
            <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-white/60">
              {projectData.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-32">
        <div className="mb-32">
          <h3 className="mb-8 font-mono text-xs text-accent">
            (01) THE CHALLENGE
          </h3>
          <TextReveal className="font-serif text-3xl leading-tight text-white/90 md:text-4xl">
            {projectData.challenge}
          </TextReveal>
        </div>

        <div className="relative mb-32 overflow-hidden border border-white/10 bg-white/[0.02] p-12">
          <h3 className="mb-12 text-center font-mono text-xs text-white/40">
            SYSTEM ARCHITECTURE
          </h3>

          <div className="flex items-center justify-center gap-12 text-center font-mono text-[10px] uppercase text-white/70 md:gap-24">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-accent bg-accent/10">
                Client
              </div>
              <div className="h-12 w-px bg-white/20" />
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
              <div className="h-12 w-px bg-white/20" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/2 h-2 w-2 animate-ping rounded-full bg-accent" />
          </div>
        </div>

        <div className="mb-32">
          <h3 className="mb-8 font-mono text-xs text-accent">(02) THE LOGIC</h3>
          <p className="mb-8 font-sans text-lg leading-relaxed text-white/70">
            {projectData.solution}
          </p>
          <ElegantCode code={projectData.snippet} lang="rust" />
        </div>

        <div className="flex justify-end border-t border-white/10 pt-24">
          <Link href="#" className="group text-right">
            <span className="mb-2 block font-mono text-xs text-white/40">
              NEXT CASE STUDY
            </span>
            <span className="font-serif text-4xl transition-colors group-hover:text-accent md:text-6xl">
              Lumina Health →
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

