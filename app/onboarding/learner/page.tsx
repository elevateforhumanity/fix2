import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Learner | Elevate For Humanity",
  description: "Learn more about Learner inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/onboarding/learner"
      label="Learner"
      section="Other"
    />
  );
}
