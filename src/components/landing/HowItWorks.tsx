import React, { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = "idle" | "detect" | "verify" | "remove" | "clean";

interface CodeLine {
  id: number;
  text: string;
  indent: number;
  dead?: boolean;         // flagged as unused
  annotation?: string;   // inline comment shown during detect/verify
  safeTag?: boolean;     // show "safe to prune" badge during verify
}

// ─── Code lines ───────────────────────────────────────────────────────────────
const CODE: CodeLine[] = [
  { id: 1,  text: 'import { db }        from "@/lib/database";',       indent: 0 },
  { id: 2,  text: 'import { sendEmail } from "@/utils/mailer";',       indent: 0 },
  { id: 3,  text: 'import { legacyFmt } from "@/utils/legacy-fmt";',   indent: 0, dead: true },
  { id: 4,  text: '',                                                   indent: 0 },
  { id: 5,  text: '/** ─ active ──────────────────────────────── */',   indent: 0 },
  { id: 6,  text: 'export async function getUser(id: string) {',        indent: 0 },
  { id: 7,  text: '  const user = await db.users.findById(id);',        indent: 1 },
  { id: 8,  text: '  if (!user) throw new Error("Not found");',         indent: 1 },
  { id: 9,  text: '  return user;',                                     indent: 1 },
  { id: 10, text: '}',                                                   indent: 0 },
  { id: 11, text: '',                                                    indent: 0 },
  { id: 12, text: '/** ─ dead: 0 references since v2 ──────── */',      indent: 0, dead: true },
  { id: 13, text: 'export function validateLegacyToken(t: string) {',   indent: 0, dead: true },
  { id: 14, text: '  return legacyFmt(t) ?? null;',                     indent: 1, dead: true },
  { id: 15, text: '}',                                                   indent: 0, dead: true },
  { id: 16, text: '',                                                    indent: 0 },
  { id: 17, text: '/** ─ active ──────────────────────────────── */',   indent: 0 },
  { id: 18, text: 'export async function sendVerification(email: string) {', indent: 0 },
  { id: 19, text: '  await sendEmail({ to: email, subject: "Verify" });', indent: 1 },
  { id: 20, text: '}',                                                   indent: 0 },
  { id: 21, text: '',                                                    indent: 0 },
  { id: 22, text: '/** ─ dead: orphaned after auth refactor ── */',     indent: 0, dead: true },
  { id: 23, text: 'const LEGACY_URL = "https://auth.v1.internal";',     indent: 0, dead: true },
  { id: 24, text: '',                                                    indent: 0 },
  { id: 25, text: 'export async function legacyLogin(u: string, pw: string) {', indent: 0, dead: true },
  { id: 26, text: '  return fetch(LEGACY_URL, {',                       indent: 1, dead: true },
  { id: 27, text: '    method: "POST",',                                indent: 2, dead: true },
  { id: 28, text: '    body: JSON.stringify({ u, pw }),',               indent: 2, dead: true },
  { id: 29, text: '  }).then(r => r.json());',                          indent: 1, dead: true },
  { id: 30, text: '}',                                                   indent: 0, dead: true },
];

const CLEAN_CODE: CodeLine[] = [
  { id: 1,  text: 'import { db }        from "@/lib/database";',       indent: 0 },
  { id: 2,  text: 'import { sendEmail } from "@/utils/mailer";',       indent: 0 },
  { id: 3,  text: '',                                                   indent: 0 },
  { id: 4,  text: '/** ─ active ──────────────────────────────── */',  indent: 0 },
  { id: 5,  text: 'export async function getUser(id: string) {',       indent: 0 },
  { id: 6,  text: '  const user = await db.users.findById(id);',       indent: 1 },
  { id: 7,  text: '  if (!user) throw new Error("Not found");',        indent: 1 },
  { id: 8,  text: '  return user;',                                    indent: 1 },
  { id: 9,  text: '}',                                                  indent: 0 },
  { id: 10, text: '',                                                   indent: 0 },
  { id: 11, text: '/** ─ active ──────────────────────────────── */',  indent: 0 },
  { id: 12, text: 'export async function sendVerification(email: string) {', indent: 0 },
  { id: 13, text: '  await sendEmail({ to: email, subject: "Verify" });', indent: 1 },
  { id: 14, text: '}',                                                  indent: 0 },
];

// ─── Step config ──────────────────────────────────────────────────────────────
const STEPS: { key: Step; num: string; title: string; body: string }[] = [
  {
    key: "idle",
    num: "00",
    title: "Unanalyzed codebase",
    body: "A typical TypeScript auth module. 30 lines. Ships every sprint. But it's carrying dead weight no one has noticed.",
  },
  {
    key: "detect",
    num: "01",
    title: "Dead code detected",
    body: "Prune.dev traces every import, export, and call site. 4 symbols surface with zero references — never reached by any active code path.",
  },
  {
    key: "verify",
    num: "02",
    title: "Safety verified",
    body: "Runtime traces, test coverage, and dynamic imports are cross-checked. Each flagged symbol is confirmed safe to remove. Confidence: 99.8%.",
  },
  {
    key: "remove",
    num: "03",
    title: "Removed automatically",
    body: "Dead lines are deleted. A reviewable PR is generated with exact diffs, ownership context, and a rollback option. No manual editing.",
  },
  {
    key: "clean",
    num: "04",
    title: "Codebase optimized",
    body: "16 lines removed. Import eliminated. Bundle down 8.3 kb. Build time saved 847 ms. Ship faster. Maintain less.",
  },
];

// ─── Syntax colorizer ─────────────────────────────────────────────────────────
function Token({ text }: { text: string }) {
  if (!text.trim()) return <span>&nbsp;</span>;
  if (text.trim().startsWith("/**") || text.trim().startsWith("*/") || text.trim().startsWith("*")) {
    return <span className="text-slate-600 italic">{text}</span>;
  }
  const kw   = new Set(["import","export","from","const","let","async","await","function","return","if","throw","new","null"]);
  const ty   = new Set(["string","number","boolean","Promise","Error"]);
  const parts = text.split(/(\b\w+\b|["'`][^"'`\\]*["'`])/g);
  return (
    <>
      {parts.map((p, i) => {
        if (kw.has(p))       return <span key={i} className="text-violet-400">{p}</span>;
        if (ty.has(p))       return <span key={i} className="text-sky-300">{p}</span>;
        if (/^["'`]/.test(p)) return <span key={i} className="text-amber-300">{p}</span>;
        if (/^[{}()[\];,.]$/.test(p)) return <span key={i} className="text-slate-500">{p}</span>;
        return <span key={i} className="text-slate-300">{p}</span>;
      })}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export const HowItWorks = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const step = STEPS[activeIdx].key;
  const lines = step === "clean" ? CLEAN_CODE : CODE;

  // IntersectionObserver — one per step card
  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
        { threshold: 0.55 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  // Removal animation
  useEffect(() => {
    if (step !== "remove" && step !== "clean") { setRemovedIds(new Set()); return; }
    const dead = CODE.filter(l => l.dead).map(l => l.id);
    let n = 0;
    const id = setInterval(() => {
      n++;
      setRemovedIds(new Set(dead.slice(0, n)));
      if (n >= dead.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [step]);

  return (
    <section id="workflow" className="relative border-t border-border/30 bg-black/5">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-widest">// HOW_IT_WORKS</div>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Watch it <span className="text-gradient italic">work live.</span>
          </h2>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            scroll to advance →
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 pb-32 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">

        {/* ── LEFT: Steps ── */}
        <div>
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              ref={el => { stepRefs.current[i] = el; }}
              className={`min-h-[80vh] flex flex-col justify-center py-16 border-l-2 pl-8 transition-all duration-300 ${
                activeIdx === i
                  ? "border-primary opacity-100"
                  : "border-border/20 opacity-20"
              }`}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  activeIdx === i ? "bg-primary animate-pulse" : "bg-border"
                }`} />
                <span className={activeIdx === i ? "text-primary" : "text-muted-foreground"}>
                  STEP_{s.num}
                </span>
              </div>
              <h3 className={`font-display text-3xl lg:text-4xl font-black tracking-tight mb-5 leading-[0.95] transition-colors duration-300 ${
                activeIdx === i ? "text-foreground" : "text-muted-foreground"
              }`}>
                {s.title}
              </h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-sm">
                {s.body}
              </p>
              {i === STEPS.length - 1 && (
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="#cta" className="font-mono text-sm font-bold px-6 py-3 rounded-sm bg-primary text-primary-foreground hover:shadow-[4px_4px_0px_0px_rgba(100,220,120,0.3)] transition-all">
                    $ scan_my_repo
                  </a>
                  <a href="#pricing" className="font-mono text-sm px-6 py-3 rounded-sm border border-border hover:bg-secondary transition-colors">
                    view_pricing()
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── RIGHT: Sticky code window ── */}
        <div
          className="hidden lg:flex flex-col sticky top-20"
          style={{ height: "calc(100vh - 5.5rem)" }}
        >
          {/* Window chrome */}
          <div className="rounded-sm border border-border bg-[#0d1117] flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)] h-full">
            {/* Title bar */}
            <div className="flex-none flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                src/auth/session.ts
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${
                step === "detect"  ? "text-orange-400" :
                step === "verify"  ? "text-sky-400"    :
                step === "remove"  ? "text-primary"    :
                step === "clean"   ? "text-primary"    : "text-slate-600"
              }`}>
                {step === "idle"   ? "READY"     :
                 step === "detect" ? "DETECTED"  :
                 step === "verify" ? "VERIFYING" :
                 step === "remove" ? "REMOVING"  : "CLEAN ✓"}
              </span>
            </div>

            {/* Code area */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {lines.map((line) => {
                    const isHighlit = line.dead && (step === "detect" || step === "verify");
                    const isVerified = line.dead && step === "verify";
                    const isRemoved  = line.dead && removedIds.has(line.id);

                    return (
                      <tr
                        key={`${line.id}-${step}`}
                        className={`group transition-all duration-200 ${
                          isHighlit && !isRemoved  ? "bg-orange-500/[0.07]" : ""
                        } ${isRemoved ? "opacity-0" : "opacity-100"}`}
                        style={{
                          maxHeight: isRemoved ? "0" : "2em",
                          overflow: "hidden",
                          display: isRemoved ? "none" : "table-row",
                          transition: "opacity 150ms ease, max-height 200ms ease",
                        }}
                      >
                        {/* Line number */}
                        <td className="select-none w-12 pr-4 text-right text-[11px] font-mono text-slate-700 align-top pt-[1px]"
                            style={{ paddingTop: "1px" }}>
                          {line.id}
                        </td>

                        {/* Gutter indicator */}
                        <td className="w-1 pr-2">
                          {isHighlit && !isRemoved && (
                            <div className="w-0.5 h-full min-h-[1.5em] bg-orange-400/60 rounded-full" />
                          )}
                        </td>

                        {/* Code */}
                        <td className="font-mono text-[12.5px] leading-[1.75] pr-4 whitespace-pre align-top">
                          <div className="flex items-start gap-3">
                            <span className={`transition-colors duration-200 ${
                              isHighlit && !isRemoved ? "text-orange-300/90" : ""
                            } ${isRemoved ? "line-through text-slate-700" : ""}`}>
                              <Token text={
                                (line.id === 12 && step === "idle") ? '/** ─ legacy session handler ─────────── */' :
                                (line.id === 22 && step === "idle") ? '/** ─ v1 auth provider ──────────────── */' :
                                line.text
                              } />
                            </span>

                            {/* Detect annotation */}
                            {line.dead && step === "detect" && line.id === 13 && (
                              <span className="font-mono text-[10px] text-orange-400/70 italic ml-2 mt-[2px] whitespace-nowrap">
                                {"// ← 0 references"}
                              </span>
                            )}
                            {line.dead && step === "detect" && line.id === 25 && (
                              <span className="font-mono text-[10px] text-orange-400/70 italic ml-2 mt-[2px] whitespace-nowrap">
                                {"// ← 0 references"}
                              </span>
                            )}
                            {line.dead && step === "detect" && line.id === 3 && (
                              <span className="font-mono text-[10px] text-orange-400/70 italic ml-2 mt-[2px] whitespace-nowrap">
                                {"// ← unused import"}
                              </span>
                            )}

                            {/* Verify annotation */}
                            {isVerified && line.id === 13 && (
                              <span className="font-mono text-[10px] text-primary/80 italic ml-2 mt-[2px] whitespace-nowrap">
                                {"// ✓ safe to prune [verified]"}
                              </span>
                            )}
                            {isVerified && line.id === 25 && (
                              <span className="font-mono text-[10px] text-primary/80 italic ml-2 mt-[2px] whitespace-nowrap">
                                {"// ✓ safe to prune [verified]"}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Clean success overlay */}
              {step === "clean" && (
                <div className="mx-4 mt-4 mb-2 p-3 rounded-sm border border-primary/25 bg-primary/[0.06] font-mono text-[11px] text-primary">
                  ✓ prune complete — 16 LOC removed · bundle -8.3 kb · build -847 ms
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="flex-none flex items-center justify-between px-4 py-2 border-t border-white/5 bg-white/[0.02] font-mono text-[10px]">
              <div className="flex items-center gap-4 text-slate-600">
                <span>TypeScript</span>
                <span>UTF-8</span>
                <span>{step === "clean" ? "14 lines" : "30 lines"}</span>
              </div>
              <div className={`flex items-center gap-1.5 transition-colors duration-300 ${
                step === "clean" ? "text-primary" : "text-slate-600"
              }`}>
                {step === "clean" && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                {step === "clean" ? "optimized" : "prune ready"}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
