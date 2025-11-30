import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Funding | Elevate For Humanity",
  description: "Learn more about Funding inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/funding"
      label="Funding"
      section="Funding"
    />
  );
}
