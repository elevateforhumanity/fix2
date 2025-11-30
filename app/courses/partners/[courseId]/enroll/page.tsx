import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Enroll | Elevate For Humanity",
  description: "Learn more about Enroll inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/partners/[courseId]/enroll"
      label="Enroll"
      section="LMS"
    />
  );
}
