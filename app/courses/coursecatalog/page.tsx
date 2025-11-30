import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Coursecatalog | Elevate For Humanity",
  description: "Learn more about Coursecatalog inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/coursecatalog"
      label="Coursecatalog"
      section="LMS"
    />
  );
}
