import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "How It Works | Elevate For Humanity",
  description: "Learn more about How It Works inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/funding/how-it-works"
      label="How It Works"
      section="Funding"
    />
  );
}
