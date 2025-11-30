import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Catalog | Elevate For Humanity",
  description: "Learn more about Catalog inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/catalog"
      label="Catalog"
      section="LMS"
    />
  );
}
