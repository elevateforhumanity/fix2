import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Progress | Elevate For Humanity",
  description: "Learn more about Progress inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/progress"
      label="Progress"
      section="For Students"
    />
  );
}
