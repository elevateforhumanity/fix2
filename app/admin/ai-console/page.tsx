import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Ai Console | Elevate For Humanity",
  description: "Learn more about Ai Console inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/ai-console"
      label="Ai Console"
      section="Admin & Staff"
    />
  );
}
