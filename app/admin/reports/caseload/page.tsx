import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Caseload | Elevate For Humanity",
  description: "Learn more about Caseload inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/reports/caseload"
      label="Caseload"
      section="Admin & Staff"
    />
  );
}
