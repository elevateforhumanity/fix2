import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Charts | Elevate For Humanity",
  description: "Learn more about Charts inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/reports/charts"
      label="Charts"
      section="Admin & Staff"
    />
  );
}
