import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Bulk | Elevate For Humanity",
  description: "Learn more about Bulk inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/certifications/bulk"
      label="Bulk"
      section="Admin & Staff"
    />
  );
}
