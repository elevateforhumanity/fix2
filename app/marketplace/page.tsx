import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Marketplace | Elevate For Humanity",
  description: "Learn more about Marketplace inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/marketplace"
      label="Marketplace"
      section="Other Pages"
    />
  );
}
