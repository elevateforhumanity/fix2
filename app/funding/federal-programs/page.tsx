import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Federal Programs | Elevate For Humanity",
  description: "Learn more about Federal Programs inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/funding/federal-programs"
      label="Federal Programs"
      section="Funding"
    />
  );
}
