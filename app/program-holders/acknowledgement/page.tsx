import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Acknowledgement | Elevate For Humanity",
  description: "Learn more about Acknowledgement inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holders/acknowledgement"
      label="Acknowledgement"
      section="Program Holders"
    />
  );
}
