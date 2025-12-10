import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center ${className ?? ""}`}>
      <Image
        src="/logo.png"
        alt="Elevate for Humanity – Building Success Stories"
        width={220}
        height={80}
        priority
      />
    </Link>
  );
}
