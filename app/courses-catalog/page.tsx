import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Courses Catalog | Elevate For Humanity",
  description: "Learn more about Courses Catalog inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses-catalog"
      label="Courses Catalog"
      section="LMS"
    />
  );
}
