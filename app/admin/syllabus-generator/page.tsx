import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Syllabus Generator | Elevate For Humanity",
  description: "Learn more about Syllabus Generator inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/syllabus-generator"
      label="Syllabus Generator"
      section="Admin & Staff"
    />
  );
}
