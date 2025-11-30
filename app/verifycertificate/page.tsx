import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Verifycertificate | Elevate For Humanity",
  description: "Learn more about Verifycertificate inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/verifycertificate"
      label="Verifycertificate"
      section="Other Pages"
    />
  );
}
