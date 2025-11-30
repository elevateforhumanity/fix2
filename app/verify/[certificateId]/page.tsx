import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[certificateId] | Elevate For Humanity",
  description: "Learn more about [certificateId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/verify/[certificateId]"
      label="[certificateId]"
      section="Other"
    />
  );
}
