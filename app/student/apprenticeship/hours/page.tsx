import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Hours | Elevate For Humanity",
  description: "Learn more about Hours inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/apprenticeship/hours"
      label="Hours"
      section="For Students"
    />
  );
}
