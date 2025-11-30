import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Learning Paths | Elevate For Humanity",
  description: "Learn more about Learning Paths inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/learning-paths"
      label="Learning Paths"
      section="LMS"
    />
  );
}
