import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Documents | Elevate For Humanity",
  description: "Learn more about Documents inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/documents"
      label="Documents"
      section="Admin & Staff"
    />
  );
}
