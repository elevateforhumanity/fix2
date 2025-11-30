import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Hvac Systems | Elevate For Humanity",
  description: "Learn more about Hvac Systems inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/courses/hvac-systems"
      label="Hvac Systems"
      section="For Students"
    />
  );
}
