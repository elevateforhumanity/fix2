import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Refund Policy | Elevate For Humanity",
  description: "Learn more about Refund Policy inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/refund-policy"
      label="Refund Policy"
      section="Other Pages"
    />
  );
}
