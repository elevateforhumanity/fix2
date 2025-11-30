import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Internal Docs | Elevate For Humanity",
  description: "Learn more about Internal Docs inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/internal-docs"
      label="Internal Docs"
      section="Admin & Staff"
    />
  );
}
