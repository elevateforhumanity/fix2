import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Resources | Elevate For Humanity",
  description: "Learn more about Resources inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/resources"
      label="Resources"
      section="For Students"
    />
  );
}
