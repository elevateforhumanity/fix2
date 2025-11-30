import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[attemptId] | Elevate For Humanity",
  description: "Learn more about [attemptId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/quizzes/[quizId]/results/[attemptId]"
      label="[attemptId]"
      section="LMS"
    />
  );
}
