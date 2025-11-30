import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Compliance | Elevate For Humanity",
  description: "Learn more about Compliance inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/compliance"
      label="Compliance"
      section="Admin & Staff"
    />
  );
}
