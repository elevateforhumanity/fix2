import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[category] | Elevate For Humanity",
  description: "Learn more about [category] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/document-center/[category]"
      label="[category]"
      section="Admin & Staff"
    />
  );
}
