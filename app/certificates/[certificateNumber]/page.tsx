import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[certificateNumber] | Elevate For Humanity",
  description: "Learn more about [certificateNumber] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/certificates/[certificateNumber]"
      label="[certificateNumber]"
      section="Other"
    />
  );
}
