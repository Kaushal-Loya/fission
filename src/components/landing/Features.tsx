import { Skull, Network, ShieldCheck, TrendingDown, GitBranch, Users } from "lucide-react";

const features = [
  {
    icon: Skull,
    title: "Dead Code Detection",
    desc: "Trace every function, file, and exported API. Surface what hasn't been called in months.",
    code: "fn unused() // 0 refs",
  },
  {
    icon: Network,
    title: "Dependency Mapping",
    desc: "Visualize how modules connect. Spot circular imports and orphaned subgraphs instantly.",
    code: "import → 1,247 edges",
  },
  {
    icon: ShieldCheck,
    title: "Safe Deletion Suggestions",
    desc: "Every removal is verified across runtime, tests, and dynamic imports before suggested.",
    code: "✓ verified · 99.8%",
  },
  {
    icon: TrendingDown,
    title: "Codebase Reduction Metrics",
    desc: "Track LOC, bundle size, and build time deltas with every prune. Quantify the impact.",
    code: "-23.4% · -847ms build",
  },
  {
    icon: GitBranch,
    title: "CI/CD Integration",
    desc: "Block bloat at PR time. Native checks for GitHub, GitLab, and CircleCI in three lines.",
    code: "prune-ci@v2 ✓",
  },
  {
    icon: Users,
    title: "Team Reports",
    desc: "Weekly digests, ownership maps, and refactor leaderboards your team will actually read.",
    code: "report.weekly = on",
  },
];

export const Features = () => {
  return (
    <section id="features" className="relative py-32">
      <div className="absolute inset-0 grid-bg mask-fade-radial opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <div className="font-mono text-xs text-primary mb-4">// 02 — capabilities</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Built for engineers who measure <span className="text-gradient">impact in milliseconds.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Six surfaces that turn "we should clean this up" into a quantified, reviewable PR.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative p-8 bg-card hover:bg-secondary/40 transition-colors duration-500"
            >
              <div className="absolute top-4 right-4 font-mono text-[10px] text-muted-foreground/60">
                0{i + 1}
              </div>

              <div className="w-11 h-11 rounded-lg border border-border bg-secondary/60 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all">
                <f.icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
              </div>

              <h3 className="font-display text-xl font-semibold mb-3 tracking-tight">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{f.desc}</p>

              <div className="font-mono text-xs text-primary/80 pt-4 border-t border-border/60">
                {f.code}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
