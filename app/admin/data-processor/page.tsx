import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Data Processor | Elevate For Humanity",
  description: "Learn more about Data Processor inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/data-processor"
      label="Data Processor"
      section="Admin & Staff"
    />
  );
}
