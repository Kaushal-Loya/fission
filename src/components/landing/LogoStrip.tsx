export const LogoStrip = () => {
  const logos = ["VERCEL", "LINEAR", "STRIPE", "FIGMA", "SUPABASE", "PLAID", "RAYCAST"];
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="font-mono text-xs text-muted-foreground text-center mb-6 tracking-wider uppercase">
          Trusted by engineering teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {logos.map((l) => (
            <span
              key={l}
              className="font-display font-bold text-lg text-muted-foreground/60 hover:text-foreground transition-colors tracking-widest"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
