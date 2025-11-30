import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Contacts | Elevate For Humanity",
  description: "Learn more about Contacts inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/contacts"
      label="Contacts"
      section="Admin & Staff"
    />
  );
}
