import {
  homeHeroImages,
  homeSecondaryStripImages,
  successStoryImages,
} from "@/lms-data/media";
import { HomeHero } from "@/components/media/HomeHero";
import { HomeProgramStrip } from "@/components/media/HomeProgramStrip";
import { SuccessStrip } from "@/components/media/SuccessStrip";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <HomeHero images={homeHeroImages} />
      <HomeProgramStrip items={homeSecondaryStripImages} />
      <SuccessStrip stories={successStoryImages} />
    </main>
  );
}
