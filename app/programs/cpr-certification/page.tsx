import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Cpr Certification | Elevate For Humanity",
  description: "Learn more about Cpr Certification inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/cpr-certification"
      label="Cpr Certification"
      section="Programs"
    />
  );
}
