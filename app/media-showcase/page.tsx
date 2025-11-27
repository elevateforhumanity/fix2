import {
  homeHeroImages,
  homeSecondaryStripImages,
  successStoryImages,
} from "@/lms-data/media";
import { HomeHero } from "@/components/media/HomeHero";
import { HomeProgramStrip } from "@/components/media/HomeProgramStrip";
import { SuccessStrip } from "@/components/media/SuccessStrip";

export const metadata = {
  title: "Media Showcase | Elevate for Humanity",
  description:
    "Preview of Elevate's new media system with hero banners and success stories using real images.",
};

export default function MediaShowcasePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <HomeHero images={homeHeroImages} />
      <HomeProgramStrip items={homeSecondaryStripImages} />
      <SuccessStrip stories={successStoryImages} />
    </main>
  );
}
