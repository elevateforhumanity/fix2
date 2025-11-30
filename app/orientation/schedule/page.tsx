import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Schedule | Elevate For Humanity",
  description: "Learn more about Schedule inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/orientation/schedule"
      label="Schedule"
      section="Other Pages"
    />
  );
}
