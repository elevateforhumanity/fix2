import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Achievements | Elevate For Humanity",
  description: "Learn more about Achievements inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/achievements"
      label="Achievements"
      section="LMS"
    />
  );
}
