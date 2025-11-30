import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Resume Builder | Elevate For Humanity",
  description: "Learn more about Resume Builder inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/careers/resume-builder"
      label="Resume Builder"
      section="Other Pages"
    />
  );
}
