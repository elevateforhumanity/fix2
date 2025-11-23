// app/page.tsx
import { Hero } from "@/components/marketing/Hero";
import { VideoStrip } from "@/components/marketing/VideoStrip";
import { ProgramCatalog } from "@/components/marketing/ProgramCatalog";
import { HowItWorksAndPlatform } from "@/components/marketing/HowItWorksAndPlatform";
import { SuccessStories } from "@/components/marketing/SuccessStories";
import { FinalCTA } from "@/components/marketing/FinalCTA";

export default function MarketingHomePage() {
  return (
    <main className="bg-slate-950 text-slate-50">
      <Hero />
      <VideoStrip />
      <ProgramCatalog />
      <HowItWorksAndPlatform />
      <SuccessStories />
      <FinalCTA />
    </main>
  );
}
