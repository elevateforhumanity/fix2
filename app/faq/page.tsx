import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "FAQ | Elevate For Humanity",
  description: "Learn more about FAQ inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/faq"
      label="FAQ"
      section="Main Pages"
    />
  );
}
