import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Course Generator | Elevate For Humanity",
  description: "Learn more about Course Generator inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/course-generator"
      label="Course Generator"
      section="Admin & Staff"
    />
  );
}
