import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Help | Elevate For Humanity",
  description: "Learn more about Help inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/help"
      label="Help"
      section="LMS"
    />
  );
}
