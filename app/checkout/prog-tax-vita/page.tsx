import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Prog Tax Vita | Elevate For Humanity",
  description: "Learn more about Prog Tax Vita inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/checkout/prog-tax-vita"
      label="Prog Tax Vita"
      section="Other"
    />
  );
}
