import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Hvac Technician | Elevate For Humanity",
  description: "Learn more about Hvac Technician inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/hvac-technician"
      label="Hvac Technician"
      section="Programs"
    />
  );
}
