import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Reentry | Elevate For Humanity",
  description: "Learn more about Reentry inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/partners/reentry"
      label="Reentry"
      section="Community"
    />
  );
}
