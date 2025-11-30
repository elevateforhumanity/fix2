import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Milady | Elevate For Humanity",
  description: "Learn more about Milady inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/certifications/milady"
      label="Milady"
      section="For Students"
    />
  );
}
