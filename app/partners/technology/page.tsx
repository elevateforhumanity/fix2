import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Technology | Elevate For Humanity",
  description: "Learn more about Technology inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/partners/technology"
      label="Technology"
      section="Community"
    />
  );
}
