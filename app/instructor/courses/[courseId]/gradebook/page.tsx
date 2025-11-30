import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Gradebook | Elevate For Humanity",
  description: "Learn more about Gradebook inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/instructor/courses/[courseId]/gradebook"
      label="Gradebook"
      section="Instructor"
    />
  );
}
