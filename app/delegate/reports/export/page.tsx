import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Export | Elevate For Humanity",
  description: "Learn more about Export inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/delegate/reports/export"
      label="Export"
      section="Case Management"
    />
  );
}
