import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Engagement | Elevate For Humanity",
  description: "Learn more about Engagement inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/analytics/engagement"
      label="Engagement"
      section="Admin & Staff"
    />
  );
}
