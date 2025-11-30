import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Events | Elevate For Humanity",
  description: "Learn more about Events inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/kingdom-konnect/events"
      label="Events"
      section="Special Programs"
    />
  );
}
