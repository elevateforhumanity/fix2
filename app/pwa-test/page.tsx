import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Pwa Test | Elevate For Humanity",
  description: "Learn more about Pwa Test inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/pwa-test"
      label="Pwa Test"
      section="Other"
    />
  );
}
