import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Skills Gap | Elevate For Humanity",
  description: "Learn more about Skills Gap inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/skills-gap"
      label="Skills Gap"
      section="For Students"
    />
  );
}
