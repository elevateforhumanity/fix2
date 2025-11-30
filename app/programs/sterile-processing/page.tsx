import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Sterile Processing | Elevate For Humanity",
  description: "Learn more about Sterile Processing inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/sterile-processing"
      label="Sterile Processing"
      section="Programs"
    />
  );
}
