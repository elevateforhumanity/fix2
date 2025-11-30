import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Course Builder | Elevate For Humanity",
  description: "Learn more about Course Builder inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/course-builder"
      label="Course Builder"
      section="Admin & Staff"
    />
  );
}
