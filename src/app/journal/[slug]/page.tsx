import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalPostBySlug } from "@/content/journal";
import RichMarkdown from "@/components/ui/RichMarkdown";

interface JournalPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function JournalPostPage({
  params,
}: JournalPostPageProps) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-32 md:px-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 border-b border-white/10 pb-6">
          <Link
            href="/journal"
            className="mb-6 inline-flex items-center font-mono text-[11px] uppercase tracking-widest text-white/50 transition-colors hover:text-accent"
          >
            ← Back to journal
          </Link>

          <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-accent">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl text-white md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-white/40">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{post.readTime}</span>
          </div>
        </header>

        <article className="space-y-8">
          <RichMarkdown content={post.content} className="space-y-6" />
        </article>
      </div>
    </main>
  );
}
