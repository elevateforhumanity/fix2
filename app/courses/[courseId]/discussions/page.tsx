import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Discussions | Elevate For Humanity",
  description: "Learn more about Discussions inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/[courseId]/discussions"
      label="Discussions"
      section="LMS"
    />
  );
}
