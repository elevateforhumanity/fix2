import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Studenthub | Elevate For Humanity",
  description: "Learn more about Studenthub inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/studenthub"
      label="Studenthub"
      section="For Students"
    />
  );
}
