import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Wioa | Elevate For Humanity",
  description: "Learn more about Wioa inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/funding/wioa"
      label="Wioa"
      section="Funding"
    />
  );
}
