import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Workflow | Elevate For Humanity",
  description: "Learn more about Workflow inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/apply/workflow"
      label="Workflow"
      section="Other"
    />
  );
}
