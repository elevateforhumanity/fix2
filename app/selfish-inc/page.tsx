import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Selfish Inc | Elevate For Humanity",
  description: "Learn more about Selfish Inc inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/selfish-inc"
      label="Selfish Inc"
      section="Other"
    />
  );
}
