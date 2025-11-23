// app/page.tsx
import { HeroCarousel } from "@/components/marketing/HeroCarousel";
import { VideoStrip } from "@/components/marketing/VideoStrip";
import { ProgramCatalog } from "@/components/marketing/ProgramCatalog";
import { PhotoCTA } from "@/components/marketing/PhotoCTA";
import { HowItWorksAndPlatform } from "@/components/marketing/HowItWorksAndPlatform";
import { SuccessStories } from "@/components/marketing/SuccessStories";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { FadeInSection } from "@/components/marketing/FadeInSection";

export default function MarketingHomePage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Rotating animated hero – bright */}
      <HeroCarousel />

      {/* Sections fade/slide in as you scroll */}
      <FadeInSection>
        <VideoStrip />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <ProgramCatalog />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <PhotoCTA />
      </FadeInSection>

      <FadeInSection delay={0.15}>
        <HowItWorksAndPlatform />
      </FadeInSection>

      <FadeInSection delay={0.2}>
        <SuccessStories />
      </FadeInSection>

      <FadeInSection delay={0.25}>
        <FinalCTA />
      </FadeInSection>
    </main>
  );
}
