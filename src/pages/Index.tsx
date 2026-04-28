import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SystemPipeline } from "@/components/landing/SystemPipeline";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { ProofSection } from "@/components/landing/ProofSection";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflowX: "clip" }}>
      <Navbar />
      <main>
        <Hero />
        <SystemPipeline />
        <HowItWorks />
        <FeatureCards />
        <ProofSection />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
