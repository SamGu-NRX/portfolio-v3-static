export interface ProjectCaseStudy {
  slug: string;
  title: string;
  type: string;
  year: string;
  img: string;
  heroImage: string;
  tagline: string;
  role: string;
  stack: string[];
  challenge: string;
  /**
   * Markdown content describing the solution and technical decisions.
   * Supports GFM and LaTeX.
   */
  solution: string;
  snippet: string;
  snippetLanguage: string;
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: "chronicle-api",
    title: "Chronicle API",
    type: "Backend Architecture",
    year: "2024",
    img: "https://picsum.photos/800/1200?random=1",
    heroImage: "https://picsum.photos/seed/tech/1920/1080",
    tagline: "A high-throughput event sourcing engine",
    role: "Lead Architect",
    stack: ["Rust", "Kafka", "Postgres", "Next.js"],
    challenge:
      "We needed to process 50k events per second while maintaining strict causal ordering. Traditional REST architectures introduced too much latency.",
    solution: `
I implemented a **CQRS** pattern where:

- The write model is a Rust service, optimized for sequential disk access.
- The read model is a separate Node.js service, tuned for fan-out and projections.
- Kafka acts as the durable event log between the two.

We modeled our throughput target as:

$$
\\lambda = 5 \\times 10^4 \\; \\text{events/second}
$$

and enforced a strict budget on per-event processing time:

$$
T_{event} \\le \\frac{1}{\\lambda}
$$

That constraint informed everything from connection pooling to backpressure strategy.
    `.trim(),
    snippet: `
impl EventStore for PostgresStore {
    async fn append(&self, stream: &str, events: &[Event]) -> Result<()> {
        let mut tx = self.pool.begin().await?;
        for event in events {
            sqlx::query!(\"INSERT INTO events ...\")
                .execute(&mut tx)
                .await?;
        }
        tx.commit().await?;
        Ok(())
    }
}
    `.trim(),
    snippetLanguage: "rust",
  },
  {
    slug: "vogue-scandinavia",
    title: "Vogue Scandinavia",
    type: "Frontend Experience",
    year: "2023",
    img: "https://picsum.photos/800/1200?random=2",
    heroImage: "https://picsum.photos/seed/vogue/1920/1080",
    tagline: "An editorial-grade, motion-heavy storefront",
    role: "Lead Frontend Engineer",
    stack: ["Next.js", "React", "TypeScript", "Framer Motion"],
    challenge:
      "Design a visually rich layout that could still hit strict performance budgets on low-end devices.",
    solution:
      `
The key was treating every animation as a *budgeted resource*.

- All scroll-linked effects use a single shared **Lenis** smooth-scroll instance.
- Heavy motion is gated behind ` +
      "`(prefers-reduced-motion)`" +
      ` and intersection observers.
- We precomputed layout-critical measurements to avoid layout thrash.

The result: a cinematic experience that still passes Core Web Vitals.
    `.trim(),
    snippet: `
export const easing = [0.16, 1, 0.3, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing },
  },
};
    `.trim(),
    snippetLanguage: "ts",
  },
  {
    slug: "lumina-health",
    title: "Lumina Health",
    type: "Fullstack Application",
    year: "2023",
    img: "https://picsum.photos/800/1200?random=3",
    heroImage: "https://picsum.photos/seed/health/1920/1080",
    tagline: "A clinician-first analytics portal",
    role: "Fullstack Engineer",
    stack: ["Next.js", "Postgres", "tRPC", "Tailwind"],
    challenge:
      "Expose complex patient metrics without overwhelming clinicians or compromising PHI.",
    solution: `
We decomposed the system into **domains**: intake, diagnostics, outcomes.

- Each domain maps to its own schema slice in Postgres.
- A thin tRPC layer exposes strongly-typed queries to the UI.
- We applied [least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) all the way down to row-level security.

From a UX perspective, we leaned on progressive disclosure: surface only the critical metrics by default and let experts drill into deeper slices of the data.
    `.trim(),
    snippet: `
type OutcomeScore = {
  patientId: string;
  delta: number;
  updatedAt: Date;
};

export function computeTrend(scores: OutcomeScore[]): number {
  if (scores.length < 2) return 0;
  const sorted = [...scores].sort(
    (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
  );
  const first = sorted[0]!.delta;
  const last = sorted[sorted.length - 1]!.delta;
  return last - first;
}
    `.trim(),
    snippetLanguage: "ts",
  },
  {
    slug: "apex-finance",
    title: "Apex Finance",
    type: "Design System",
    year: "2022",
    img: "https://picsum.photos/800/1200?random=4",
    heroImage: "https://picsum.photos/seed/finance/1920/1080",
    tagline: "A resilient design system for fintech surfaces",
    role: "Design Engineer",
    stack: ["React", "TypeScript", "Storybook", "Figma"],
    challenge:
      "Unify five independent product teams under a single visual and interaction language.",
    solution: `
We treated the design system as an **API surface**, not a component gallery.

- Tokens are the source of truth; components are thin views over those tokens.
- Every primitive ships with accessibility guarantees (focus, contrast, semantics).
- We wired Storybook into visual regression tests so teams could ship with confidence.

The payoff was compounding: each new product shipped faster *and* with fewer bespoke decisions.
    `.trim(),
    snippet: `
export const button = {
  base: "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
  variants: {
    primary: "bg-accent text-black hover:bg-accent/90",
    ghost: "bg-transparent text-foreground hover:bg-foreground/5",
  },
} as const;
    `.trim(),
    snippetLanguage: "ts",
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projects.find((project) => project.slug === slug);
}
