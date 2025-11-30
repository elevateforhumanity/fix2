import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Refunds | Elevate For Humanity",
  description: "Learn more about Refunds inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/refunds"
      label="Refunds"
      section="Other Pages"
    />
  );
}
