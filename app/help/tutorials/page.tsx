import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Tutorials | Elevate For Humanity",
  description: "Learn more about Tutorials inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/help/tutorials"
      label="Tutorials"
      section="Other"
    />
  );
}
