import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Kingdomkonnect | Elevate For Humanity",
  description: "Learn more about Kingdomkonnect inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/kingdomkonnect"
      label="Kingdomkonnect"
      section="Special Programs"
    />
  );
}
