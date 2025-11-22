"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { journalPosts } from "@/content/journal";

export default function Journal() {
  return (
    <main className={`bg-background min-h-screen px-6 pt-40 pb-20 md:px-12`}>
      <div className="mx-auto max-w-7xl">
        <div
          className={`mb-24 flex items-end justify-between border-b border-white/10 pb-8`}
        >
          <h1 className={`font-serif text-6xl md:text-8xl`}>Journal</h1>
          <p
            className={`hidden max-w-xs text-right font-mono text-xs text-white/50 md:block`}
          >
            NOTES ON ENGINEERING, DESIGN, AND ARTIFICIAL INTELLIGENCE.
          </p>
        </div>

        <div className="flex flex-col">
          {journalPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className={`group relative border-b border-white/10 py-12 transition-colors hover:bg-white/[0.02]`}
            >
              <div
                className={`relative z-10 flex flex-col justify-between md:flex-row md:items-center`}
              >
                <div className="flex flex-col gap-2">
                  <span
                    className={`text-accent mb-2 font-mono text-[10px] tracking-widest uppercase`}
                  >
                    {post.category}
                  </span>
                  <h2
                    className={`font-serif text-3xl text-white/90 transition-colors group-hover:text-white md:text-5xl`}
                  >
                    {post.title}
                  </h2>
                </div>

                <div
                  className={`mt-4 flex items-center gap-8 font-mono text-xs text-white/40 group-hover:text-white/60 md:mt-0`}
                >
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`from-accent/20 pointer-events-none absolute top-1/2 right-20 h-32 w-64 -translate-y-1/2 rounded-full bg-gradient-to-r to-transparent opacity-0 blur-2xl group-hover:opacity-100`}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
