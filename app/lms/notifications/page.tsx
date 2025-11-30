import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Notifications | Elevate For Humanity",
  description: "Learn more about Notifications inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/notifications"
      label="Notifications"
      section="LMS"
    />
  );
}
