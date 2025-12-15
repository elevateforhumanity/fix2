'use client';

export default function HeroVideoBackground() {
  return (
    <video
      src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2081093367&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=td32mzkbEAOLiCaYuy2bvh7fIHwp6fCyqklEkMOKrB-HylGvkEp87xGd5VEp5ipv7IKQgjImURhapXmq9BhcEIvGHlYH4rGeIX9P4ThM0ha7wZOH2kl8RIdUQEVSFKM6U9~Eel5Fwpgr5-MZh-YmCpZRG9Gw9KLNhFiWKlh6AjXYppVLz0rf1-FXx4dcGM6qWtmYo9WQOCCqRjzmWqtGkqF88rUy7YvU6XrxUpb9k9M3~biPVNpbErqRJxX8nPLkwvKEWOmfzC~cjQQGpkGJoFEOUxq8y0u6y73ekcECQJbHjkE3EYSsY-DshZZcDU6T9OhHrV6QbHJo85f4~r7mlA__"
      muted
      loop
      playsInline
      preload="none"
      className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
      onLoadedData={(e) => {
        const video = e.target as HTMLVideoElement;
        video.classList.remove('opacity-0');
        video.play().catch(() => {});
      }}
    />
  );
}
