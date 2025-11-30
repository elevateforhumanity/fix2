import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Founder | Elevate For Humanity",
  description: "Learn more about Founder inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/founder"
      label="Founder"
      section="Other Pages"
    />
  );
}
