import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Countersign Mou | Elevate For Humanity",
  description: "Learn more about Countersign Mou inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/program-holders/[id]/countersign-mou"
      label="Countersign Mou"
      section="Admin & Staff"
    />
  );
}
