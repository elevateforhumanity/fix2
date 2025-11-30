import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Courses | Elevate For Humanity",
  description: "Learn more about Courses inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/urban-build-crew/courses"
      label="Courses"
      section="Other"
    />
  );
}
