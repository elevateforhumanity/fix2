import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Course | Elevate For Humanity",
  description: "Learn more about Course inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/enroll/course"
      label="Course"
      section="Other Pages"
    />
  );
}
