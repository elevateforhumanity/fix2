import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Course Authoring | Elevate For Humanity",
  description: "Learn more about Course Authoring inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/course-authoring"
      label="Course Authoring"
      section="Admin & Staff"
    />
  );
}
