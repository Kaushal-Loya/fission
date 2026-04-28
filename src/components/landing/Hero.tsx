import { ArrowRight, GitBranch, Zap } from "lucide-react";

// Static code preview — "detection" state, matching HowItWorks aesthetics
const PREVIEW_LINES = [
  { ln: 1,  text: 'import { db }        from "@/lib/database";',             dead: false },
  { ln: 2,  text: 'import { legacyFmt } from "@/utils/legacy-fmt";',         dead: true  },
  { ln: 3,  text: '',                                                          dead: false },
  { ln: 4,  text: 'export async function getUser(id: string) {',             dead: false },
  { ln: 5,  text: '  const user = await db.users.findById(id);',             dead: false },
  { ln: 6,  text: '  return user;',                                           dead: false },
  { ln: 7,  text: '}',                                                         dead: false },
  { ln: 8,  text: '',                                                          dead: false },
  { ln: 9,  text: 'export function validateLegacySession(t: string) {',       dead: true  },
  { ln: 10, text: '  return legacyFmt(t) ?? null;  // 0 references',         dead: true  },
  { ln: 11, text: '}',                                                         dead: true  },
  { ln: 12, text: '',                                                          dead: false },
  { ln: 13, text: 'export async function legacyLogin(u: string, p: string) {', dead: true },
  { ln: 14, text: '  return fetch("https://auth.v1.internal", {',            dead: true  },
  { ln: 15, text: '    method: "POST", body: JSON.stringify({ u, p }),',      dead: true  },
  { ln: 16, text: '  }).then(r => r.json());',                                dead: true  },
  { ln: 17, text: '}',                                                         dead: true  },
];

function CodeToken({ text, dead }: { text: string; dead: boolean }) {
  if (!text.trim()) return <span>&nbsp;</span>;
  const kw = new Set(["import","export","from","const","async","await","function","return","null"]);
  const parts = text.split(/(\b\w+\b|["'`][^"'`]*["'`])/g);
  return (
    <>
      {parts.map((p, i) => {
        if (dead) return <span key={i} className="text-orange-300/80">{p}</span>;
        if (kw.has(p)) return <span key={i} className="text-violet-400">{p}</span>;
        if (/^["'`]/.test(p)) return <span key={i} className="text-amber-300">{p}</span>;
        if (/^[{}()[\];,.]$/.test(p)) return <span key={i} className="text-slate-500">{p}</span>;
        return <span key={i} className="text-slate-300">{p}</span>;
      })}
    </>
  );
}

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center border-b border-border/30 overflow-hidden">
      {/* Subtle grid — right half only */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 grid-bg opacity-[0.06]" />
      {/* Faint glow behind code panel */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1fr_1.15fr] gap-16 items-center py-32 pt-40">

        {/* ── LEFT: Copy ── */}
        <div>
          {/* Eyebrow — subtle, no pill */}
          <p className="text-xs text-muted-foreground mb-6 tracking-wide uppercase">
            Static analysis · Dead code removal · CI/CD integration
          </p>

          {/* Headline — left aligned, tight */}
          <h1 className="font-display text-5xl lg:text-[64px] xl:text-[72px] leading-[0.92] font-black tracking-tight mb-7">
            Your repo is<br />
            <span className="text-gradient italic">lying to you.</span>
          </h1>

          {/* Subtext — one sentence, factual */}
          <p className="text-base text-muted-foreground max-w-sm mb-10 leading-relaxed">
            Find dead code, verify it's safe to remove, and ship a PR — automatically. No false positives.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 mb-12 flex-wrap">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
            >
              Scan your repository
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#workflow"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-border text-sm text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Social proof — tight grid */}
          <div className="grid grid-cols-3 gap-6 border-t border-border/40 pt-8 max-w-xs">
            {[
              { value: "12k+", label: "Repos scanned" },
              { value: "23%",  label: "Avg. reduction" },
              { value: "99.8%", label: "Accuracy" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-xl font-bold font-display text-foreground">{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Code preview panel ── */}
        <div className="relative hidden lg:block">
          {/* Floating badges */}
          <div className="absolute -top-4 -right-4 z-20 flex items-center gap-2 bg-card border border-border/60 rounded-sm px-3 py-2 shadow-lg">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium">4 dead symbols found</span>
          </div>
          <div className="absolute -bottom-4 left-4 z-20 flex items-center gap-2 bg-card border border-primary/30 rounded-sm px-3 py-2 shadow-lg">
            <GitBranch className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">PR generated · -16 LOC · -847ms build</span>
          </div>

          {/* Code editor */}
          <div className="rounded-sm border border-border bg-[#0d1117] overflow-hidden shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[10px] text-slate-500">src/auth/session.ts</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-orange-400">
                4 dead detected
              </span>
            </div>

            {/* Lines */}
            <div className="py-2 font-mono text-[12px] leading-[1.75]">
              {PREVIEW_LINES.map(line => (
                <div
                  key={line.ln}
                  className={`flex items-start ${line.dead ? "bg-orange-500/[0.07]" : ""}`}
                >
                  {/* Line number */}
                  <span className="select-none flex-none w-10 text-right pr-4 text-slate-700 text-[10px] leading-[1.75]">
                    {line.ln}
                  </span>
                  {/* Gutter */}
                  <span className="flex-none w-1 mr-2">
                    {line.dead && (
                      <span className="block w-0.5 h-full min-h-[1.5em] bg-orange-400/50 rounded-full" />
                    )}
                  </span>
                  {/* Code */}
                  <span className="flex-1 whitespace-pre pr-6">
                    <CodeToken text={line.text} dead={line.dead} />
                  </span>
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/5 bg-white/[0.02] font-mono text-[10px] text-slate-600">
              <span>TypeScript · 17 lines</span>
              <span className="text-orange-400">prune: scan complete</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
