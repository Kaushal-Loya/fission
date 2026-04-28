import { ShieldCheck, Activity } from "lucide-react";
import SpotlightCard from './SpotlightCard';

export const FeatureCards = () => {
  return (
    <section id="features" className="relative py-32 border-t border-border/40">
      <div className="absolute inset-0 grid-bg opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Engineering-first features for <br />
            <span className="text-gradient">modern codebases.</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* WIDE CARD: DEP GRAPH */}
          <SpotlightCard className="lg:col-span-8 rounded-lg border border-border bg-card/30" spotlightColor="rgba(34, 197, 94, 0.15)">
            <div className="p-10 relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-muted-foreground">MODULE_MAP_v2.0</div>
              <div className="max-w-md relative z-10">
                <h3 className="font-display text-2xl font-bold mb-4">Granular Dependency Mapping</h3>
                <p className="text-muted-foreground mb-8">
                  Prune.dev doesn't just look at files. We trace every function export, constant, and internal API edge to ensure nothing that is used gets touched.
                </p>
                <div className="flex gap-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Live Trace
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-border" />
                    Dead Branch
                  </div>
                </div>
              </div>
              {/* Background Texture/Accent */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors" />
            </div>
          </SpotlightCard>

          {/* STAT BLOCK: CI/CD */}
          <SpotlightCard className="lg:col-span-4 rounded-lg border border-border bg-card/30" spotlightColor="rgba(0, 229, 255, 0.15)">
            <div className="p-8 flex flex-col justify-between h-full">
              <div>
                <Activity className="w-8 h-8 text-accent mb-6" />
                <h3 className="font-display text-xl font-bold mb-2">Continuous Hygiene</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Automate pruning. Prevent bloat from ever entering your main branch.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-mono text-[10px] text-muted-foreground mb-4 italic">github-actions/prune.yml</div>
                <div className="bg-black/40 p-3 rounded font-mono text-[11px] border border-white/5">
                  <span className="text-primary">run:</span> npx prune@latest
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* CODE SNIPPET: SAFE REMOVAL */}
          <SpotlightCard className="lg:col-span-4 rounded-lg border border-border bg-card/30" spotlightColor="rgba(34, 197, 94, 0.15)">
            <div className="p-8 h-full">
               <ShieldCheck className="w-8 h-8 text-primary mb-6" />
               <h3 className="font-display text-xl font-bold mb-2">Safe-Removal Engine</h3>
               <div className="font-mono text-[11px] text-muted-foreground mt-6 space-y-2">
                  <div className="flex justify-between border-b border-border pb-2">
                     <span>Syntax Check</span>
                     <span className="text-primary">PASS</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                     <span>Test Coverage</span>
                     <span className="text-primary">PASS</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                     <span>Refs Count</span>
                     <span className="text-primary">0</span>
                  </div>
               </div>
            </div>
          </SpotlightCard>

          {/* ASYMMETRIC STAT BLOCK */}
          <SpotlightCard className="lg:col-span-8 rounded-lg border border-border bg-primary/5" spotlightColor="rgba(34, 197, 94, 0.1)">
             <div className="p-10 relative overflow-hidden group h-full">
               <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                     <h3 className="font-display text-2xl font-bold mb-4">Actionable Metrics</h3>
                     <p className="text-muted-foreground">
                        Quantify the cost of dead code. We calculate build time savings and bundle size reduction for every proposed change.
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                     <div className="p-6 bg-black/40 border border-white/5 rounded text-center">
                        <div className="text-3xl font-display font-bold text-primary">-23%</div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase mt-1">Code Size</div>
                     </div>
                     <div className="p-6 bg-black/40 border border-white/5 rounded text-center">
                        <div className="text-3xl font-display font-bold text-accent">-12s</div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase mt-1">Build Time</div>
                     </div>
                  </div>
               </div>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
};
