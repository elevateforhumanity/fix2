import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Learners | Elevate For Humanity",
  description: "Learn more about Learners inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/learners"
      label="Learners"
      section="Other Pages"
    />
  );
}
