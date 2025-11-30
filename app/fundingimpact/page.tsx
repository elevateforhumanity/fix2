import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Fundingimpact | Elevate For Humanity",
  description: "Learn more about Fundingimpact inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/fundingimpact"
      label="Fundingimpact"
      section="Funding"
    />
  );
}
