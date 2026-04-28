export const DependencyGraph = () => {
  // Nodes: live (kept) vs dead (to prune)
  const nodes = [
    { id: "core", x: 250, y: 180, r: 28, label: "core", type: "root" },
    { id: "auth", x: 120, y: 90, r: 18, label: "auth", type: "live" },
    { id: "api", x: 380, y: 90, r: 20, label: "api", type: "live" },
    { id: "db", x: 410, y: 240, r: 16, label: "db", type: "live" },
    { id: "utils", x: 130, y: 260, r: 16, label: "utils", type: "live" },
    { id: "legacy", x: 60, y: 180, r: 14, label: "legacy.ts", type: "dead" },
    { id: "old-api", x: 460, y: 150, r: 12, label: "v1/users", type: "dead" },
    { id: "unused", x: 340, y: 320, r: 13, label: "helpers", type: "dead" },
    { id: "stub", x: 200, y: 50, r: 10, label: "stub", type: "dead" },
    { id: "leak", x: 280, y: 300, r: 15, label: "mem-leak", type: "risky" },
  ];

  const edges = [
    { from: "core", to: "auth", live: true },
    { from: "core", to: "api", live: true },
    { from: "core", to: "db", live: true },
    { from: "core", to: "utils", live: true },
    { from: "api", to: "db", live: true },
    { from: "core", to: "legacy", live: false },
    { from: "api", to: "old-api", live: false },
    { from: "core", to: "unused", live: false },
    { from: "auth", to: "stub", live: false },
    { from: "api", to: "leak", live: true, risky: true },
  ];

  const get = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="relative">
      {/* Card frame */}
      <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.25)]">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          </div>
          <div className="font-mono text-xs text-muted-foreground">~/repo · prune scan --depth=full</div>
          <div className="font-mono text-[10px] text-primary">● analyzing</div>
        </div>

        {/* SVG graph */}
        <div className="relative dot-bg">
          <svg viewBox="0 0 520 380" className="w-full h-auto">
            <defs>
              <radialGradient id="liveGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(190 95% 55%)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(190 95% 55%)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="deadGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(142 90% 55%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(142 90% 55%)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="riskyGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(0 75% 60%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(0 75% 60%)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Edges */}
            {edges.map((e, i) => {
              const a = get(e.from);
              const b = get(e.to);
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={e.risky ? "hsl(0 75% 60% / 0.7)" : e.live ? "hsl(190 95% 55% / 0.5)" : "hsl(142 90% 55% / 0.4)"}
                  strokeWidth={e.risky ? 1.5 : e.live ? 1.2 : 1}
                  strokeDasharray={e.live ? "0" : "4 3"}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((n) => {
              const isDead = n.type === "dead";
              const isRoot = n.type === "root";
              const isRisky = n.type === "risky";
              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r={n.r + 14} fill={isRisky ? "url(#riskyGlow)" : isDead ? "url(#deadGlow)" : "url(#liveGlow)"} opacity={isRoot ? 1 : 0.6} />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r}
                    fill={isRisky ? "hsl(222 40% 7%)" : isDead ? "hsl(222 40% 7%)" : isRoot ? "hsl(190 95% 55%)" : "hsl(222 40% 9%)"}
                    stroke={isRisky ? "hsl(0 75% 60%)" : isDead ? "hsl(142 90% 55%)" : "hsl(190 95% 55%)"}
                    strokeWidth={isRoot || isRisky ? 2 : 1.5}
                    strokeDasharray={isDead ? "3 2" : "0"}
                  />
                  <text
                    x={n.x}
                    y={n.y + n.r + 14}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="10"
                    fill={isRisky ? "hsl(0 75% 65%)" : isDead ? "hsl(142 90% 65%)" : "hsl(210 40% 80%)"}
                  >
                    {n.label}
                  </text>
                  {isDead && (
                    <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="11" fill="hsl(142 90% 65%)" className="font-mono">×</text>
                  )}
                  {isRisky && (
                    <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="10" fill="hsl(0 75% 65%)" className="font-mono">!</text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> kept</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full border border-primary" /> safe to prune</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full border border-destructive" /> risky</span>
            </div>
            <span className="text-primary">+1,284 LOC removable</span>
          </div>
        </div>

        {/* Footer stats */}
        <div className="grid grid-cols-3 border-t border-border font-mono text-xs">
          {[
            { l: "files", v: "1,247", c: "" },
            { l: "dead", v: "184", c: "text-primary" },
            { l: "reduction", v: "-23.4%", c: "text-primary" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-3 border-r border-border last:border-r-0">
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">{s.l}</div>
              <div className={`text-base font-semibold ${s.c || "text-foreground"}`}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating annotation */}
      <div className="absolute right-6 top-16 hidden sm:block animate-pulse">
        <div className="font-mono text-xs px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary backdrop-blur">
          → 4 modules unused since Q1
        </div>
      </div>
    </div>
  );
};
