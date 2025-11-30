import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Workforce | Elevate For Humanity",
  description: "Learn more about Workforce inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/partners/workforce"
      label="Workforce"
      section="Community"
    />
  );
}
