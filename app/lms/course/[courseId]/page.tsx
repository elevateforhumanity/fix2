import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[courseId] | Elevate For Humanity",
  description: "Learn more about [courseId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/course/[courseId]"
      label="[courseId]"
      section="LMS"
    />
  );
}
