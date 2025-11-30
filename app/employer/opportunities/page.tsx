import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Opportunities | Elevate For Humanity",
  description: "Learn more about Opportunities inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/employer/opportunities"
      label="Opportunities"
      section="Other Pages"
    />
  );
}
