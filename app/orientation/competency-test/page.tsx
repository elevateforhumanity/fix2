import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Competency Test | Elevate For Humanity",
  description: "Learn more about Competency Test inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/orientation/competency-test"
      label="Competency Test"
      section="Other Pages"
    />
  );
}
