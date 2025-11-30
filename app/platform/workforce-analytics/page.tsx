import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Workforce Analytics | Elevate For Humanity",
  description: "Learn more about Workforce Analytics inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/platform/workforce-analytics"
      label="Workforce Analytics"
      section="Other"
    />
  );
}
