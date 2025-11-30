import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Outcomes | Elevate For Humanity",
  description: "Learn more about Outcomes inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/outcomes"
      label="Outcomes"
      section="Admin & Staff"
    />
  );
}
