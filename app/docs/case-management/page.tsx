import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Case Management | Elevate For Humanity",
  description: "Learn more about Case Management inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/docs/case-management"
      label="Case Management"
      section="Other Pages"
    />
  );
}
