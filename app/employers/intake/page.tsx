import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Intake | Elevate For Humanity",
  description: "Learn more about Intake inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/employers/intake"
      label="Intake"
      section="For Employers"
    />
  );
}
