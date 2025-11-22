import { codeToHtml } from "shiki";
import { notFound } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";
import { getProjectBySlug } from "@/content/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  let highlightedSnippetHtml: string;

  try {
    highlightedSnippetHtml = await codeToHtml(project.snippet, {
      lang: project.snippetLanguage,
      theme: "github-dark",
    });
  } catch {
    const escaped = project.snippet
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    highlightedSnippetHtml = `<pre><code>${escaped}</code></pre>`;
  }

  return (
    <ProjectPageClient
      project={project}
      highlightedSnippetHtml={highlightedSnippetHtml}
    />
  );
}
