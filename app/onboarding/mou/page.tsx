import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Mou | Elevate For Humanity",
  description: "Learn more about Mou inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/onboarding/mou"
      label="Mou"
      section="Other"
    />
  );
}
