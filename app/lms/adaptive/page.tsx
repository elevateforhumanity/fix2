import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Adaptive | Elevate For Humanity",
  description: "Learn more about Adaptive inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/adaptive"
      label="Adaptive"
      section="LMS"
    />
  );
}
