import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Calendar | Elevate For Humanity",
  description: "Learn more about Calendar inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/calendar"
      label="Calendar"
      section="LMS"
    />
  );
}
