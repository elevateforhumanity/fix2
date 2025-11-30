import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Professional Esthetician | Elevate For Humanity",
  description: "Learn more about Professional Esthetician inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/professional-esthetician"
      label="Professional Esthetician"
      section="Programs"
    />
  );
}
