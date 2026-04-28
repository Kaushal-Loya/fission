import { Check } from "lucide-react";

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
            <div
              key={t.name}
              className={`relative rounded-sm border p-8 flex flex-col transition-all duration-500 ${
                t.featured
                  ? "border-primary bg-primary/5 shadow-[8px_8px_0px_0px_rgba(var(--primary-glow),0.2)] md:-translate-y-4 scale-105 z-10"
                  : "border-border bg-card/30 md:translate-y-4 opacity-80 hover:opacity-100"
              }`}
            >
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
                    ? "bg-primary text-primary-foreground hover:shadow-[4px_4px_0px_0px_rgba(var(--primary-glow),0.4)]"
                    : "border border-border bg-secondary/30 hover:bg-secondary text-foreground"
                }`}
              >
                {t.cta.toUpperCase()}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
