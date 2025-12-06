import Image from "next/image";

export function HomeTopHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/home/home-hero-gradient-efh.jpg"
        alt="Elevate for Humanity - Empowering Futures Through Innovation & Opportunity"
        width={1920}
        height={800}
        priority
        className="h-[420px] w-full object-cover"
      />
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Elevate For Humanity
          </h1>
          <p className="text-xl md:text-2xl">
            Empowering Futures Through Innovation & Opportunity
          </p>
        </div>
      </div>
    </section>
  );
}
