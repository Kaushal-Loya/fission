import { Terminal } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.5)] group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-mono font-semibold text-base tracking-tight">
            prune<span className="text-primary">.dev</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {["Product", "Features", "Pricing", "Docs"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors relative group">
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </a>
          <a
            href="#cta"
            className="font-mono text-xs px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)] transition-all hover:-translate-y-0.5"
          >
            $ scan_repo
          </a>
        </div>
      </div>
    </header>
  );
};
