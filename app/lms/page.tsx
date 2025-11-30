import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "LMS | Elevate For Humanity",
  description: "Learn more about LMS inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms"
      label="LMS"
      section="LMS"
    />
  );
}
