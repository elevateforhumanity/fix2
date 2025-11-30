import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Attendance | Elevate For Humanity",
  description: "Learn more about Attendance inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/partner/attendance"
      label="Attendance"
      section="Other"
    />
  );
}
