export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  /**
   * Short line used in previews or meta.
   */
  summary: string;
  /**
   * Full markdown content for the post.
   * Supports GFM and LaTeX via remark-math/rehype-katex.
   */
  content: string;
}

export const journalPosts: JournalPost[] = [
  {
    slug: "ethics-of-computer-vision",
    title: "The Ethics of Computer Vision",
    date: "NOV 2024",
    readTime: "5 MIN",
    category: "AI/ML",
    summary: "Where the loss function meets lived reality.",
    content: `
Computer vision is not just about **accuracy**; it's about *consequences*.

When we deploy a model, we're implicitly encoding a value system into the world.

## The Objective Function

Most pipelines start with a loss function like:

$$
\\mathcal{L}(\\theta) = \\mathbb{E}_{(x, y) \\sim \\mathcal{D}}\\big[\\ell(f_\\theta(x), y)\\big]
$$

What this hides is *whose* distribution $\\mathcal{D}$ we're optimizing over.

- Which populations dominate the dataset?
- Which error modes are we willing to tolerate?

## Beyond Top-1 Accuracy

For safety-critical systems, we often care more about **asymmetry** in errors than aggregate accuracy:

- A false negative might be merely inconvenient.
- A false positive might be life-altering.

Formally, we can model this as a cost-sensitive loss:

$$
\\mathcal{L}_{cost} = c_{FN} \\cdot FN + c_{FP} \\cdot FP
$$

The key is that the *costs* $c_{FN}, c_{FP}$ must be negotiated with the people affected, not just the engineering team.
    `.trim(),
  },
  {
    slug: "why-i-chose-rust-for-web",
    title: "Why I Chose Rust for Web",
    date: "OCT 2024",
    readTime: "8 MIN",
    category: "ENGINEERING",
    summary:
      "Latency budgets, ownership, and the joy of zero-cost abstractions.",
    content:
      `
There's a moment when your backend stops being \"just another API\" and starts to feel like **infrastructure**.

For that layer, Rust brings a few superpowers:

1. **Predictable performance** without a GC.
2. **Ownership** as a first-class design constraint.
3. A thriving ecosystem around async IO.

## Throughput as a First-Class Metric

Assume an SLO of:

$$
P(\\text{latency} \\le 50\\,\\text{ms}) \\ge 0.99
$$

You quickly realize that every allocation and context switch matters.

Rust forces you to make that cost explicit, which is exactly what I want at the core of a system that other teams will build upon.

In practice, this looked like:

- Using ` +
      "`tokio`" +
      ` for async orchestration.
- Leaning on ` +
      "`sqlx`" +
      ` for compile-time query checking.
- Building small, composable crates instead of a monolith service.
    `.trim(),
  },
  {
    slug: "design-systems-as-infrastructure",
    title: "Design Systems as Infrastructure",
    date: "AUG 2024",
    readTime: "4 MIN",
    category: "DESIGN",
    summary: "Treating components like APIs instead of decorations.",
    content: `
Design systems are often sold as **component libraries**.

I prefer to think of them as *infrastructure*:

- Tokens are configuration.
- Components are APIs.
- Figma files are just documentation.

## A Small Equation

You can think of the system as a function:

$$
f(\\text{intent}, \\text{constraints}) \\rightarrow \\text{UI}
$$

Where:

- **intent** encodes what the user is trying to do.
- **constraints** encode brand, accessibility, and platform rules.

The closer your primitives stay to this mental model, the less entropy you add to the codebase over time.
    `.trim(),
  },
  {
    slug: "optimizing-docker-builds",
    title: "Optimizing Docker Builds",
    date: "JUL 2024",
    readTime: "6 MIN",
    category: "DEVOPS",
    summary: "Layering, caching, and making CI logs readable again.",
    content: `
Optimizing Docker builds is mostly about respecting *layers* and *boundaries*.

Some low-friction wins:

- Install OS-level dependencies before app dependencies.
- Copy only what you need for each stage.
- Use multi-stage builds to keep the final image lean.

## A Simple Mental Model

Let:

$$
T_{build} = \\sum_{i=1}^{n} T_{layer_i}
$$

If a layer rarely changes, it should be as **high** in the Dockerfile as possible so it can be cached.

That one change alone can turn a 7-minute build into a 40-second one in CI.
    `.trim(),
  },
];

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((post) => post.slug === slug);
}
