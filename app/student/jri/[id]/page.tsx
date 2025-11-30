import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[id] | Elevate For Humanity",
  description: "Learn more about [id] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/jri/[id]"
      label="[id]"
      section="For Students"
    />
  );
}
