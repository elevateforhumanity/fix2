import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Partner Portal | Elevate For Humanity",
  description: "Learn more about Partner Portal inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/platform/partner-portal"
      label="Partner Portal"
      section="Other"
    />
  );
}
