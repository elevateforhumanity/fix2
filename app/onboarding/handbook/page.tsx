import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Handbook | Elevate For Humanity",
  description: "Learn more about Handbook inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/onboarding/handbook"
      label="Handbook"
      section="Other"
    />
  );
}
