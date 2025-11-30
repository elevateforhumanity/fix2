import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Messages | Elevate For Humanity",
  description: "Learn more about Messages inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/messages"
      label="Messages"
      section="LMS"
    />
  );
}
