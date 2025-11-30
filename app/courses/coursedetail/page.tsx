import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Coursedetail | Elevate For Humanity",
  description: "Learn more about Coursedetail inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/courses/coursedetail"
      label="Coursedetail"
      section="LMS"
    />
  );
}
