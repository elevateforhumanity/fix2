import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Scorm | Elevate For Humanity",
  description: "Learn more about Scorm inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/scorm"
      label="Scorm"
      section="For Students"
    />
  );
}
