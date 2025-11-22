"use client";
import Link from "next/link";
import { journalPosts } from "@/content/journal";

export default function JournalPreview() {
  return (
    <section className="border-t border-white/10 bg-background px-6 py-24 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl">Journal</h2>
          <p className="mt-4 max-w-sm font-mono text-xs uppercase tracking-widest text-foreground/60">
            Notes on engineering, design, and artificial intelligence.
          </p>
        </div>

        <div className="flex-1">
          <div className="flex flex-col">
            {journalPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group border-b border-white/10 py-4 last:border-b-0"
              >
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <div>
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
                      {post.category}
                    </span>
                    <span className="font-serif text-xl text-foreground/90 transition-colors group-hover:text-foreground md:text-2xl">
                      {post.title}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-foreground/40">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/journal"
              className="font-mono text-xs uppercase tracking-widest text-foreground/60 underline underline-offset-4 hover:text-accent"
            >
              View all entries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
