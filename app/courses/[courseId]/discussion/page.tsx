import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Discussion | Elevate For Humanity",
  description: "Learn more about Discussion inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/[courseId]/discussion"
      label="Discussion"
      section="LMS"
    />
  );
}
