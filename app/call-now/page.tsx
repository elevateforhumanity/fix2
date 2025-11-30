import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Call Now | Elevate For Humanity",
  description: "Learn more about Call Now inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/call-now"
      label="Call Now"
      section="Other"
    />
  );
}
