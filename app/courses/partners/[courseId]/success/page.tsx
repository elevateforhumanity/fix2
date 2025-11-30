import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Success | Elevate For Humanity",
  description: "Learn more about Success inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/partners/[courseId]/success"
      label="Success"
      section="LMS"
    />
  );
}
