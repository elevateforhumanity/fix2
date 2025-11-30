import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Copilot | Elevate For Humanity",
  description: "Learn more about Copilot inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/copilot"
      label="Copilot"
      section="Admin & Staff"
    />
  );
}
