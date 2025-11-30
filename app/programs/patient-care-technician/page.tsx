import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Patient Care Technician | Elevate For Humanity",
  description: "Learn more about Patient Care Technician inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/patient-care-technician"
      label="Patient Care Technician"
      section="Programs"
    />
  );
}
