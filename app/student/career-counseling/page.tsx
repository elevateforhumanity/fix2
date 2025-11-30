import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Career Counseling | Elevate For Humanity",
  description: "Learn more about Career Counseling inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/career-counseling"
      label="Career Counseling"
      section="For Students"
    />
  );
}
