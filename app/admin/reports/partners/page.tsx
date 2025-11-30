import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Partners | Elevate For Humanity",
  description: "Learn more about Partners inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/reports/partners"
      label="Partners"
      section="Admin & Staff"
    />
  );
}
