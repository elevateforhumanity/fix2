import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Enroll Workforce | Elevate For Humanity",
  description: "Learn more about Enroll Workforce inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/enroll-workforce"
      label="Enroll Workforce"
      section="LMS"
    />
  );
}
