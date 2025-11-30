import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Sales | Elevate For Humanity",
  description: "Learn more about Sales inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/partners/sales"
      label="Sales"
      section="Community"
    />
  );
}
