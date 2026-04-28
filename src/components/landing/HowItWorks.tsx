const steps = [
  {
    num: "01",
    title: "Connect repo",
    desc: "Authorize GitHub, GitLab, or Bitbucket. Self-hosted? Drop in our CLI.",
    cmd: "$ prune init",
  },
  {
    num: "02",
    title: "Analyze structure",
    desc: "Static + runtime tracing maps every dependency edge across your codebase.",
    cmd: "→ scanning 1,247 files",
  },
  {
    num: "03",
    title: "Get actionable insights",
    desc: "Reviewable diffs, ownership context, and one-click PRs ready to merge.",
    cmd: "✓ 184 prunable",
  },
];

export const HowItWorks = () => {
  return (
    <section id="product" className="relative py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
          <div className="max-w-xl">
            <div className="font-mono text-xs text-primary mb-4">// 03 — workflow</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
              Three steps from <span className="text-gradient">bloat to baseline.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            avg. setup time → <span className="text-foreground">4 min 12 sec</span>
          </div>
        </div>

        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {steps.map((s) => (
            <div key={s.num} className="relative">
              <div className="relative w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6 mx-auto md:mx-0">
                <span className="font-mono text-sm text-primary font-semibold">{s.num}</span>
                <span className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-dot" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3 tracking-tight">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
              <div className="font-mono text-xs text-primary/80 px-3 py-2 rounded-md bg-secondary/60 border border-border inline-block">
                {s.cmd}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
