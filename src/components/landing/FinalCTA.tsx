import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-fade-radial opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/20 blur-[140px] rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="font-mono text-[10px] text-primary mb-6">// SHIP_LIGHTER.sh</div>
        <h2 className="font-display text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-[0.95]">
          Find what your repo <br />
          <span className="text-gradient italic text-[0.9em]">is hiding.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 font-mono text-sm">
          # scan your codebase now. delete safely. ship faster.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-primary text-primary-foreground font-mono font-bold hover:shadow-[8px_8px_0px_0px_rgba(var(--primary-glow),0.4)] transition-all active:translate-x-1 active:translate-y-1"
          >
            $ SCAN_CODEBASE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-sm font-mono text-sm text-primary/80">
            npm i -g prune-cli
          </div>
        </div>

        <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          no credit card · 3 free scans · 100% surgical accuracy
        </div>
      </div>
    </section>
  );
};
