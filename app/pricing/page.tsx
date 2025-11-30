import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Pricing | Elevate For Humanity",
  description: "Learn more about Pricing inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/pricing"
      label="Pricing"
      section="Other"
    />
  );
}
