import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Orientation | Elevate For Humanity",
  description: "Learn more about Orientation inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/onboarding/staff/orientation"
      label="Orientation"
      section="Other Pages"
    />
  );
}
