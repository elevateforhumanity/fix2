import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Bulk Operations | Elevate For Humanity",
  description: "Learn more about Bulk Operations inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/courses/bulk-operations"
      label="Bulk Operations"
      section="Admin & Staff"
    />
  );
}
