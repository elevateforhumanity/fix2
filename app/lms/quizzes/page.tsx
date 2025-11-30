import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Quizzes | Elevate For Humanity",
  description: "Learn more about Quizzes inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/quizzes"
      label="Quizzes"
      section="LMS"
    />
  );
}
