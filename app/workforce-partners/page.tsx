import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Workforce Partners | Elevate For Humanity",
  description: "Learn more about Workforce Partners inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/workforce-partners"
      label="Workforce Partners"
      section="Other Pages"
    />
  );
}
