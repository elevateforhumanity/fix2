'use client';

export default function HeroSlideshow() {
  return (
    <div className="absolute inset-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-90"
      >
        <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2080573361&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=rI5UHv2UMlBfkBpaDuFVenGCGZbCO1Zv7QRUZimnYwDokGC798BlmiMVc1UB8TGa4XS1eR0gOwVCWZ9~BC-it~Guvkj2PXZWKaSOWjtn30JLTKegCoF5hI3Pw1aNVmrYTygFnkCKSfbKWIMklY6-xgaH6r6YWeFGECxocy2csm8~wVW2xre-OWDasUP9tvJ-Uecc5vV9qtQVSgxaqQ604KJZnTOq6Wgh~jgCl8nl2EqXn0ZbMfwuyzZS1-ytRtgVz2qPWSNjtPiqrsvesfBIvqqFv4wot5gpv4FH1uIEv-noKxQ~tSDqd9f3M~nH4o0tDzD4~~q1tO6b3einm1xbzw__" type="video/mp4" />
      </video>
    </div>
  );
}
