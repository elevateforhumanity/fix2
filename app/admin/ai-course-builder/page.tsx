import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Ai Course Builder | Elevate For Humanity",
  description: "Learn more about Ai Course Builder inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/ai-course-builder"
      label="Ai Course Builder"
      section="Admin & Staff"
    />
  );
}
