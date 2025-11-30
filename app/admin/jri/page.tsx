import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Jri | Elevate For Humanity",
  description: "Learn more about Jri inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/jri"
      label="Jri"
      section="Admin & Staff"
    />
  );
}
