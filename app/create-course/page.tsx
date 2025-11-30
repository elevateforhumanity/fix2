import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Create Course | Elevate For Humanity",
  description: "Learn more about Create Course inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/create-course"
      label="Create Course"
      section="Other"
    />
  );
}
