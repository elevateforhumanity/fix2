import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Barber Spotlight | Elevate For Humanity",
  description: "Learn more about Barber Spotlight inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/videos/barber-spotlight"
      label="Barber Spotlight"
      section="Other"
    />
  );
}
