import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Badges | Elevate For Humanity",
  description: "Learn more about Badges inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/badges"
      label="Badges"
      section="For Students"
    />
  );
}
