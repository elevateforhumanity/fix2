import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Wioa Eligibility | Elevate For Humanity",
  description: "Learn more about Wioa Eligibility inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/wioa-eligibility"
      label="Wioa Eligibility"
      section="Other Pages"
    />
  );
}
