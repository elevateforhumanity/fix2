import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Parent Portal | Elevate For Humanity",
  description: "Learn more about Parent Portal inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/parent-portal"
      label="Parent Portal"
      section="Other Pages"
    />
  );
}
