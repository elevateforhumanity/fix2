import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Accessibility | Elevate For Humanity",
  description: "Learn more about Accessibility inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/accessibility"
      label="Accessibility"
      section="Other Pages"
    />
  );
}
