import { HeroBanner } from "@/components/HeroBanner";
import { ContentWithImage } from "@/components/ContentWithImage";
import { homepageVisuals } from "@/lib/pageVisuals";

export default function HomePage() {
  const { heroes, sections } = homepageVisuals;

  return (
    <main className="bg-white">
      {/* At least 2 hero banners */}
      {heroes.map((hero) => (
        <HeroBanner key={hero.id} hero={hero} />
      ))}

      {/* Content sections with bullets + examples + images */}
      <div className="bg-gray-50">
        {sections.map((section, idx) => (
          <ContentWithImage
            key={section.id}
            section={section}
            reverse={idx % 2 === 1}
          />
        ))}
      </div>
    </main>
  );
}
