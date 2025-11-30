import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Partner | Elevate For Humanity",
  description: "Learn more about Partner inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/onboarding/partner"
      label="Partner"
      section="Other"
    />
  );
}
