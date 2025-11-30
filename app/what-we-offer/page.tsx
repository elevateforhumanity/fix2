import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "What We Offer | Elevate For Humanity",
  description: "Learn more about What We Offer inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/what-we-offer"
      label="What We Offer"
      section="Other"
    />
  );
}
