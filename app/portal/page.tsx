import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Portal | Elevate For Humanity",
  description: "Learn more about Portal inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/portal"
      label="Portal"
      section="Other Pages"
    />
  );
}
