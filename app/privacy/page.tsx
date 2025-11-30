import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Privacy | Elevate For Humanity",
  description: "Learn more about Privacy inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/privacy"
      label="Privacy"
      section="Other"
    />
  );
}
