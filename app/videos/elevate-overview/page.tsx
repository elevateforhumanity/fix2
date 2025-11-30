import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Elevate Overview | Elevate For Humanity",
  description: "Learn more about Elevate Overview inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/videos/elevate-overview"
      label="Elevate Overview"
      section="Other"
    />
  );
}
