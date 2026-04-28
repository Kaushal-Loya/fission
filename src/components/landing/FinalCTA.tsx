import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-fade-radial opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/20 blur-[140px] rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="font-mono text-xs text-primary mb-6">// 05 — ship_leaner.exe</div>
        <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.05]">
          Stop maintaining code <br />
          <span className="text-gradient">that no one uses.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
          Connect your repo. Get a full audit in under 30 seconds. Decide what to keep.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_40px_hsl(var(--primary)/0.7)] transition-all hover:-translate-y-0.5"
          >
            Start Free Scan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-3">
            $ npm i -g prune-cli
          </a>
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          no credit card · 3 free scans · cancel anytime
        </div>
      </div>
    </section>
  );
};
