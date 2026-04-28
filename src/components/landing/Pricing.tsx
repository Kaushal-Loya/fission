import BorderGlow from './BorderGlow';

const tiers = [
  {
    name: "Free",
    price: "0",
    cadence: "forever",
    desc: "For solo devs exploring small projects.",
    features: ["3 repo scans / month", "Public repos only", "Dead code detection", "Community support"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "29",
    cadence: "/ month",
    desc: "Ideal for individual developers shipping production code.",
    features: [
      "Unlimited scans",
      "Private repos",
      "Dependency mapping",
      "Safe removal AI",
      "CI/CD integration",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Team",
    price: "89",
    cadence: "/ user / mo",
    desc: "For engineering teams requiring collaboration & integrations.",
    features: [
      "Everything in Pro",
      "Team reports & heatmaps",
      "Custom integrations",
      "SAML SSO",
      "Self-hosted runner",
      "Dedicated support",
    ],
    cta: "Talk to sales",
    featured: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-32 border-t border-border/60">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Pay for the bloat you remove.
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent tiers. No seat-based surprises. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {tiers.map((t, i) => (
            <BorderGlow
              key={t.name}
              glowColor={t.featured ? "34, 197, 94" : "40, 80, 80"}
              backgroundColor={t.featured ? "#0F1612" : "#0B0F14"}
              borderRadius={8}
              glowRadius={160}
              glowIntensity={1}
              animated={t.featured}
              colors={['#22c55e', '#16a34a', '#4ade80']}
              className={`transition-all duration-500 ${
                t.featured ? "md:-translate-y-4 scale-105 z-10" : "md:translate-y-4 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="p-8 flex flex-col h-full">
                {t.featured && (
                  <div className="absolute -top-3 right-4 font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-sm bg-primary text-primary-foreground font-bold">
                    RECOMMENDED
                  </div>
                )}

                <div className="mb-6">
                  <div className="font-mono text-[10px] text-muted-foreground mb-4 flex items-center gap-2">
                     <span className={`w-1.5 h-1.5 rounded-full ${t.featured ? 'bg-primary' : 'bg-muted-foreground'}`} />
                     TIER_{i+1}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-1 tracking-tight">{t.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{t.desc}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                     <span className="font-mono text-sm text-muted-foreground">$</span>
                     <span className="font-display text-5xl font-black tracking-tight">{t.price}</span>
                     <span className="text-xs text-muted-foreground font-mono ml-1">{t.cadence}</span>
                  </div>
                  <div className="mt-2 font-mono text-[10px] text-primary/80">
                     {t.name === "Free" ? "Up to 5k LOC scanned" : t.name === "Pro" ? "Up to 100k LOC scanned" : "Unlimited LOC scanned"}
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-xs font-mono">
                      <span className={t.featured ? "text-primary" : "text-muted-foreground"}>{'>'}</span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`text-center font-mono text-xs font-bold py-3 px-4 rounded-sm transition-all ${
                    t.featured
                      ? "bg-primary text-primary-foreground hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]"
                      : "border border-border bg-secondary/30 hover:bg-secondary text-foreground"
                  }`}
                >
                  {t.cta.toUpperCase()}
                </a>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
};
