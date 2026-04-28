import { Terminal } from "lucide-react";

export const Footer = () => {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Developers", links: ["Docs", "API Reference", "CLI", "GitHub"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  ];
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-mono font-semibold">prune<span className="text-primary">.dev</span></span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Repository surgery for engineers who care about what they ship.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <div>© 2026 Prune.dev — built for engineers, by engineers.</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};
