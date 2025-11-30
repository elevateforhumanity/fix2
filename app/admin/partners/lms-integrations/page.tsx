import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Lms Integrations | Elevate For Humanity",
  description: "Learn more about Lms Integrations inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/partners/lms-integrations"
      label="Lms Integrations"
      section="Admin & Staff"
    />
  );
}
