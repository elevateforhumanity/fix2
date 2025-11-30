import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "State Programs | Elevate For Humanity",
  description: "Learn more about State Programs inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/funding/state-programs"
      label="State Programs"
      section="Funding"
    />
  );
}
