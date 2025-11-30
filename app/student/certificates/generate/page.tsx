import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Generate | Elevate For Humanity",
  description: "Learn more about Generate inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/certificates/generate"
      label="Generate"
      section="For Students"
    />
  );
}
