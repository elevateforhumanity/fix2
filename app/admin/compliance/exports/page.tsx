import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Exports | Elevate For Humanity",
  description: "Learn more about Exports inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/compliance/exports"
      label="Exports"
      section="Admin & Staff"
    />
  );
}
