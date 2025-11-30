import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Questions | Elevate For Humanity",
  description: "Learn more about Questions inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/courses/[id]/quizzes/[quizId]/questions"
      label="Questions"
      section="Admin & Staff"
    />
  );
}
