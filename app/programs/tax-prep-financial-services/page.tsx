import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Tax Prep Financial Services | Elevate For Humanity",
  description: "Learn more about Tax Prep Financial Services inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/tax-prep-financial-services"
      label="Tax Prep Financial Services"
      section="Programs"
    />
  );
}
