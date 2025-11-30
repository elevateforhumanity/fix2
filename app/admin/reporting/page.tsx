import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Reporting | Elevate For Humanity",
  description: "Learn more about Reporting inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/reporting"
      label="Reporting"
      section="Admin & Staff"
    />
  );
}
