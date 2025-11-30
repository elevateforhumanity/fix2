import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Quiz Builder | Elevate For Humanity",
  description: "Learn more about Quiz Builder inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/quiz-builder"
      label="Quiz Builder"
      section="Admin & Staff"
    />
  );
}
