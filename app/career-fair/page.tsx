import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Career Fair | Elevate For Humanity",
  description: "Learn more about Career Fair inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/career-fair"
      label="Career Fair"
      section="Other"
    />
  );
}
