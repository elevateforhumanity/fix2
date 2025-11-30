import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Student Portal | Elevate For Humanity",
  description: "Learn more about Student Portal inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student-portal"
      label="Student Portal"
      section="For Students"
    />
  );
}
