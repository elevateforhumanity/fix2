import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Course Templates | Elevate For Humanity",
  description: "Learn more about Course Templates inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/course-templates"
      label="Course Templates"
      section="Admin & Staff"
    />
  );
}
