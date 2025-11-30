import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Reports | Elevate For Humanity",
  description: "Learn more about Reports inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/portal/reports"
      label="Reports"
      section="Program Holders"
    />
  );
}
