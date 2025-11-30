import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Features | Elevate For Humanity",
  description: "Learn more about Features inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/features"
      label="Features"
      section="Other Pages"
    />
  );
}
