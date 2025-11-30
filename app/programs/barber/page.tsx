import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Barber | Elevate For Humanity",
  description: "Learn more about Barber inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/barber"
      label="Barber"
      section="Programs"
    />
  );
}
