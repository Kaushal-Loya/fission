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
    desc: "For individuals shipping serious code.",
    features: [
      "Unlimited scans",
      "Private repos",
      "Dependency mapping",
      "Safe deletion AI",
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
    desc: "For engineering teams at scale.",
    features: [
      "Everything in Pro",
      "Team reports & digests",
      "Ownership mapping",
      "SAML SSO",
      "Self-hosted runner",
      "Dedicated engineer",
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
          <div className="font-mono text-xs text-primary mb-4">// 04 — pricing</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Pay for the bloat you remove.
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent tiers. No seat-based surprises. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all hover:-translate-y-1 ${
                t.featured
                  ? "border-primary/60 bg-gradient-to-b from-primary/[0.08] to-card shadow-[0_0_60px_-20px_hsl(var(--primary)/0.5)]"
                  : "border-border bg-card/60 hover:border-border"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="font-mono text-xs text-muted-foreground mb-2">// {t.name.toLowerCase()}</div>
                <h3 className="font-display text-2xl font-bold mb-2">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="font-mono text-sm text-muted-foreground">$</span>
                <span className="font-display text-5xl font-bold tracking-tight">{t.price}</span>
                <span className="text-sm text-muted-foreground ml-1">{t.cadence}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${t.featured ? "text-primary" : "text-muted-foreground"}`} strokeWidth={2.5} />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`text-center text-sm font-semibold py-3 rounded-lg transition-all ${
                  t.featured
                    ? "bg-primary text-primary-foreground hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)]"
                    : "border border-border bg-secondary/40 hover:bg-secondary text-foreground"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
