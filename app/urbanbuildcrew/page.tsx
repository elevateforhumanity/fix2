import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Urbanbuildcrew | Elevate For Humanity",
  description: "Learn more about Urbanbuildcrew inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/urbanbuildcrew"
      label="Urbanbuildcrew"
      section="Special Programs"
    />
  );
}
