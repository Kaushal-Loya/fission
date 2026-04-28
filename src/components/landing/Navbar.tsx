import { Terminal } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-sm bg-primary flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(var(--primary-glow),0.2)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
            <Terminal className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
          </div>
          <span className="font-mono font-black text-xl tracking-tighter">
            PRUNE<span className="text-primary">.DEV</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {[
            { label: "Product", href: "#" },
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#workflow" },
            { label: "Pricing", href: "#pricing" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="hover:text-foreground transition-colors relative group">
              {item.label}
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
            Scan Repo
          </a>
        </div>
      </div>
    </header>
  );
};
