import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Hsi | Elevate For Humanity",
  description: "Learn more about Hsi inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/hsi"
      label="Hsi"
      section="LMS"
    />
  );
}
