import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Live | Elevate For Humanity",
  description: "Learn more about Live inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/[courseId]/live"
      label="Live"
      section="LMS"
    />
  );
}
