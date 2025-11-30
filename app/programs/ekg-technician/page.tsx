import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Ekg Technician | Elevate For Humanity",
  description: "Learn more about Ekg Technician inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/ekg-technician"
      label="Ekg Technician"
      section="Programs"
    />
  );
}
