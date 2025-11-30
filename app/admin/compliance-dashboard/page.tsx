import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Compliance Dashboard | Elevate For Humanity",
  description: "Learn more about Compliance Dashboard inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/compliance-dashboard"
      label="Compliance Dashboard"
      section="Admin & Staff"
    />
  );
}
