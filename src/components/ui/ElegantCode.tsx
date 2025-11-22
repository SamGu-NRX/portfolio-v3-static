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
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
          {lang}
        </span>
      </div>
      <div className="overflow-x-auto p-6">
        <pre className="font-mono text-sm leading-relaxed text-white/70">
          <code>{code}</code>
        </pre>
      </div>
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
    </div>
  );
}

