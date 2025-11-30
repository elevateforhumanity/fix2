import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Coursebuilder | Elevate For Humanity",
  description: "Learn more about Coursebuilder inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/coursebuilder"
      label="Coursebuilder"
      section="LMS"
    />
  );
}
