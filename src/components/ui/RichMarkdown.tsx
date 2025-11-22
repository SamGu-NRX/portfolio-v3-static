"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface RichMarkdownProps {
  content: string;
  className?: string;
}

export default function RichMarkdown({ content, className }: RichMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className={className}
      components={{
        h1: ({ ...props }) => (
          <h1
            className="mb-6 font-serif text-4xl text-white/90 md:text-5xl"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h2
            className="mb-4 mt-8 font-serif text-3xl text-white/90 md:text-4xl"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3
            className="mb-3 mt-6 font-serif text-2xl text-white/90 md:text-3xl"
            {...props}
          />
        ),
        p: ({ ...props }) => (
          <p className="text-white/80 leading-relaxed" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul
            className="ml-5 list-disc space-y-2 text-white/80"
            {...props}
          />
        ),
        ol: ({ ...props }) => (
          <ol
            className="ml-5 list-decimal space-y-2 text-white/80"
            {...props}
          />
        ),
        li: ({ ...props }) => <li {...props} />,
        a: ({ ...props }) => (
          <a
            className="underline decoration-accent/60 underline-offset-4 hover:text-accent"
            {...props}
          />
        ),
        code({
          inline,
          className,
          children,
          ...props
        }: {
          node?: unknown;
          inline?: boolean;
          className?: string;
          children?: React.ReactNode;
        }) {
          const languageMatch = /language-(\w+)/.exec(className ?? "");

          if (inline || !languageMatch) {
            return (
              <code
                className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <pre
              className="mt-4 overflow-x-auto rounded border border-white/10 bg-[#0f0f11] p-4"
              {...props}
            >
              <code className="font-mono text-sm leading-relaxed text-white/80">
                {children}
              </code>
            </pre>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
