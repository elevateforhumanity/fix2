import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Dental Assistant | Elevate For Humanity",
  description: "Learn more about Dental Assistant inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/dental-assistant"
      label="Dental Assistant"
      section="Programs"
    />
  );
}
