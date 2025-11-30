import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Document Center | Elevate For Humanity",
  description: "Learn more about Document Center inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/document-center"
      label="Document Center"
      section="Admin & Staff"
    />
  );
}
