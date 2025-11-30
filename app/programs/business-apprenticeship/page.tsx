import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Business Apprenticeship | Elevate For Humanity",
  description: "Learn more about Business Apprenticeship inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/business-apprenticeship"
      label="Business Apprenticeship"
      section="Programs"
    />
  );
}
