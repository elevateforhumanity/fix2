import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Tax Vita | Elevate For Humanity",
  description: "Learn more about Tax Vita inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/tax-vita"
      label="Tax Vita"
      section="Programs"
    />
  );
}
