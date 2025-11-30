import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Instructor | Elevate For Humanity",
  description: "Learn more about Instructor inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/instructor"
      label="Instructor"
      section="For Students"
    />
  );
}
