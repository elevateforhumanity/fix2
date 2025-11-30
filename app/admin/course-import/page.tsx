import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Course Import | Elevate For Humanity",
  description: "Learn more about Course Import inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/course-import"
      label="Course Import"
      section="Admin & Staff"
    />
  );
}
