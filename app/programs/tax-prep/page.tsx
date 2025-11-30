import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Tax Prep | Elevate For Humanity",
  description: "Learn more about Tax Prep inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/tax-prep"
      label="Tax Prep"
      section="Programs"
    />
  );
}
