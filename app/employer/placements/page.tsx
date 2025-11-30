import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Placements | Elevate For Humanity",
  description: "Learn more about Placements inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/employer/placements"
      label="Placements"
      section="Other Pages"
    />
  );
}
