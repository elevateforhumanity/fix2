import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Certificates | Elevate For Humanity",
  description: "Learn more about Certificates inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/certificates"
      label="Certificates"
      section="Admin & Staff"
    />
  );
}
