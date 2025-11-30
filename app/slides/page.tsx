import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Slides | Elevate For Humanity",
  description: "Learn more about Slides inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/slides"
      label="Slides"
      section="Other"
    />
  );
}
