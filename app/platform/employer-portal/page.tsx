import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Employer Portal | Elevate For Humanity",
  description: "Learn more about Employer Portal inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/platform/employer-portal"
      label="Employer Portal"
      section="Other Pages"
    />
  );
}
