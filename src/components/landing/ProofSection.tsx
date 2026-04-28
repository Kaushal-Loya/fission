import { ArrowRight, Terminal } from "lucide-react";

export const ProofSection = () => {
  return (
    <section className="relative py-32 bg-black/20 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-fade-radial opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              REAL_WORLD_OUTPUT.log
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight mb-6">
              Proof, not <span className="text-gradient italic">promises.</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We don't just find dead code. We generate the PRs to remove it. Here's what a typical scan looks like for a 50k LOC repository.
            </p>
            
            <div className="space-y-4">
              {[
                { label: "Before", files: "1,247", dead: "184 modules" },
                { label: "After", files: "1,063", dead: "0 (optimized)", highlight: true },
              ].map((s) => (
                <div key={s.label} className={`p-4 rounded border ${s.highlight ? 'border-primary/30 bg-primary/5' : 'border-border bg-card/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-muted-foreground">{s.label}</span>
                    {s.highlight && <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">Success</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">Files</div>
                      <div className="text-xl font-display font-bold">{s.files}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">Dead Modules</div>
                      <div className={`text-xl font-display font-bold ${s.highlight ? 'text-primary' : ''}`}>{s.dead}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-lg border border-border bg-black/60 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">diff --git a/src/services/legacy_auth.ts</div>
              </div>
              <div className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto whitespace-pre">
                <div className="text-muted-foreground opacity-40 mb-2">@@ -14,28 +0,0 @@</div>
                <div className="bg-red-500/10 text-red-500/80 -mx-6 px-6">- export async function validateLegacySession(id: string) &#123;</div>
                <div className="bg-red-500/10 text-red-500/80 -mx-6 px-6">-   const session = await db.query('SELECT * FROM sessions WHERE id = ?', [id]);</div>
                <div className="bg-red-500/10 text-red-500/80 -mx-6 px-6">-   if (!session) return null;</div>
                <div className="bg-red-500/10 text-red-500/80 -mx-6 px-6">-   return decodeSession(session);</div>
                <div className="bg-red-500/10 text-red-500/80 -mx-6 px-6">- &#125;</div>
                <div className="bg-red-500/10 text-red-500/80 -mx-6 px-6">-</div>
                <div className="bg-red-500/10 text-red-500/80 -mx-6 px-6">- // This utility has been orphaned since the v2 migration</div>
                <div className="bg-red-500/10 text-red-500/80 -mx-6 px-6">- export const LEGACY_AUTH_ENDPOINT = "https://auth.old-stack.io";</div>
                <div className="text-primary mt-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>prune: removed 1 unused export, 1 unused constant</span>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                   <div className="p-3 bg-primary/10 rounded border border-primary/20">
                      <div className="text-[10px] text-primary font-mono uppercase">Bundle Size</div>
                      <div className="text-xl font-bold font-display text-primary">-23.4%</div>
                   </div>
                   <div className="p-3 bg-accent/10 rounded border border-accent/20">
                      <div className="text-[10px] text-accent font-mono uppercase">Build Time</div>
                      <div className="text-xl font-bold font-display text-accent">-847ms</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
