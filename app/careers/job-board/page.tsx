import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Job Board | Elevate For Humanity",
  description: "Learn more about Job Board inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/careers/job-board"
      label="Job Board"
      section="Career Services"
    />
  );
}
