import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[scormId] | Elevate For Humanity",
  description: "Learn more about [scormId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/scorm/[scormId]"
      label="[scormId]"
      section="For Students"
    />
  );
}
