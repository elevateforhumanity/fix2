import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Competencies | Elevate For Humanity",
  description: "Learn more about Competencies inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/competencies"
      label="Competencies"
      section="For Students"
    />
  );
}
