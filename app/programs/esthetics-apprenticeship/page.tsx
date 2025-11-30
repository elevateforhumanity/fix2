import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Esthetics Apprenticeship | Elevate For Humanity",
  description: "Learn more about Esthetics Apprenticeship inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/esthetics-apprenticeship"
      label="Esthetics Apprenticeship"
      section="Programs"
    />
  );
}
