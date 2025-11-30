import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Study Groups | Elevate For Humanity",
  description: "Learn more about Study Groups inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/study-groups"
      label="Study Groups"
      section="Other"
    />
  );
}
