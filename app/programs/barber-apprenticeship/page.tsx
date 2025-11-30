import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Barber Apprenticeship | Elevate For Humanity",
  description: "Learn more about Barber Apprenticeship inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/barber-apprenticeship"
      label="Barber Apprenticeship"
      section="Programs"
    />
  );
}
