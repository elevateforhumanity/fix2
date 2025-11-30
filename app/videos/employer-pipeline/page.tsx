import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Employer Pipeline | Elevate For Humanity",
  description: "Learn more about Employer Pipeline inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/videos/employer-pipeline"
      label="Employer Pipeline"
      section="Other Pages"
    />
  );
}
