import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Proposal | Elevate For Humanity",
  description: "Learn more about Proposal inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/employers/[id]/proposal"
      label="Proposal"
      section="Admin & Staff"
    />
  );
}
