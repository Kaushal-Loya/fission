import { ArrowRight, Play } from "lucide-react";
import { DependencyGraph } from "./DependencyGraph";

export const Hero = () => {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg mask-fade-radial opacity-40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        {/* LEFT: Copy */}
        <div className="lg:col-span-6 animate-float-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur font-mono text-xs text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
            v2.4 — now scanning monorepos in &lt;30s
          </div>

          <h1 className="font-display text-5xl lg:text-[64px] leading-[1.05] font-bold tracking-tight mb-6">
            Detect dead code.<br />
            <span className="text-gradient">Ship a leaner repo.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mb-2 leading-relaxed">
            Prune.dev statically traces every function, file, and API across your codebase — then surfaces what's safe to delete.
          </p>
          <p className="font-mono text-sm text-primary/90 mb-10">
            // teams reduce repo size by an average of <span className="text-primary font-semibold">23%</span>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_32px_hsl(var(--primary)/0.6)] transition-all hover:-translate-y-0.5"
            >
              Analyze Repository
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-card/50 backdrop-blur text-foreground font-medium text-sm hover:bg-card hover:border-primary/40 transition-all"
            >
              <Play className="w-4 h-4 fill-foreground" />
              View Demo
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 text-xs font-mono text-muted-foreground">
            <div><span className="text-foreground font-semibold">12,847</span> repos scanned</div>
            <div className="w-px h-4 bg-border" />
            <div><span className="text-foreground font-semibold">4.2M</span> dead lines removed</div>
            <div className="w-px h-4 bg-border" />
            <div><span className="text-foreground font-semibold">99.8%</span> safe-delete accuracy</div>
          </div>
        </div>

        {/* RIGHT: Dependency graph visualization */}
        <div className="lg:col-span-6 relative animate-float-up" style={{ animationDelay: "0.15s" }}>
          <DependencyGraph />
        </div>
      </div>
    </section>
  );
};
