import { Skull, Network, GitBranch, Terminal } from "lucide-react";

export const SystemPipeline = () => {
  return (
    <section id="pipeline" className="relative py-32 border-t border-border/40">
      <div className="absolute inset-0 grid-bg opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
            A connected pipeline for <br />
            <span className="text-gradient">cleaner architecture.</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {[
            { 
              step: "01", 
              label: "Scan Repo", 
              desc: "CLI-based deep static analysis of your imports.",
              icon: Terminal,
              active: true
            },
            { 
              step: "02", 
              label: "Map Graph", 
              desc: "Building a full dependency tree across modules.",
              icon: Network 
            },
            { 
              step: "03", 
              label: "Detect Dead", 
              desc: "Isolating nodes with zero incoming references.",
              icon: Skull 
            },
            { 
              step: "04", 
              label: "Generate PR", 
              desc: "Verified safe-to-remove code removal.",
              icon: GitBranch 
            },
          ].map((s) => (
            <div key={s.step} className="relative z-10 group">
              <div className={`w-20 h-20 rounded-sm border ${s.active ? 'border-primary shadow-[0_0_20px_rgba(var(--primary-glow),0.2)] bg-primary/10' : 'border-border bg-card/50'} flex items-center justify-center mb-6 transition-all group-hover:border-primary/50`}>
                <s.icon className={`w-8 h-8 ${s.active ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="font-mono text-[10px] text-primary mb-2">STEP_{s.step}</div>
              <h3 className="font-display font-bold text-lg mb-2">{s.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
