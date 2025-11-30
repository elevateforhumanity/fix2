import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Pharmacy Technician | Elevate For Humanity",
  description: "Learn more about Pharmacy Technician inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/pharmacy-technician"
      label="Pharmacy Technician"
      section="Programs"
    />
  );
}
