import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[quizId] | Elevate For Humanity",
  description: "Learn more about [quizId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/quizzes/[quizId]"
      label="[quizId]"
      section="LMS"
    />
  );
}
