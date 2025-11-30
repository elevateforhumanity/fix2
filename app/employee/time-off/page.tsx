import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Time Off | Elevate For Humanity",
  description: "Learn more about Time Off inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/employee/time-off"
      label="Time Off"
      section="Other Pages"
    />
  );
}
