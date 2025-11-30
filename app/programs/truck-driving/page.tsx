import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Truck Driving | Elevate For Humanity",
  description: "Learn more about Truck Driving inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/truck-driving"
      label="Truck Driving"
      section="Programs"
    />
  );
}
