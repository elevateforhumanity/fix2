import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Curriculumupload | Elevate For Humanity",
  description: "Learn more about Curriculumupload inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/curriculumupload"
      label="Curriculumupload"
      section="Other Pages"
    />
  );
}
