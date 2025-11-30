import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Thankyou | Elevate For Humanity",
  description: "Learn more about Thankyou inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/thankyou"
      label="Thankyou"
      section="Other Pages"
    />
  );
}
