import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Learning Path | Elevate For Humanity",
  description: "Learn more about Learning Path inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/learning-path"
      label="Learning Path"
      section="For Students"
    />
  );
}
