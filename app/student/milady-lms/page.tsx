import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Milady Lms | Elevate For Humanity",
  description: "Learn more about Milady Lms inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/milady-lms"
      label="Milady Lms"
      section="For Students"
    />
  );
}
