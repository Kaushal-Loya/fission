import { Github, Gitlab, Hexagon, Box, Triangle, Cloud } from "lucide-react";

export const LogoStrip = () => {
  const logos = [
    { name: "GITHUB", icon: Github },
    { name: "GITLAB", icon: Gitlab },
    { name: "VERCEL", icon: Triangle },
    { name: "AWS", icon: Cloud },
    { name: "DOCKER", icon: Box },
    { name: "NODE", icon: Hexagon },
  ];
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="font-mono text-xs text-muted-foreground text-center mb-6 tracking-wider uppercase">
          Trusted by engineering teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((l) => (
            <div
              key={l.name}
              className="flex items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <l.icon className="w-5 h-5" strokeWidth={2.5} />
              <span className="font-display font-bold text-lg tracking-widest">
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
