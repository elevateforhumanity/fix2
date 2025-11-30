import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Assignments | Elevate For Humanity",
  description: "Learn more about Assignments inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/assignments"
      label="Assignments"
      section="For Students"
    />
  );
}
