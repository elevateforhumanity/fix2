import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Cm | Elevate For Humanity",
  description: "Learn more about Cm inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/cm"
      label="Cm"
      section="Other"
    />
  );
}
