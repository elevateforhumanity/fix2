import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Onboarding | Elevate For Humanity",
  description: "Learn more about Onboarding inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/onboarding"
      label="Onboarding"
      section="Other"
    />
  );
}
