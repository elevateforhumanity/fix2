import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Ojt And Funding | Elevate For Humanity",
  description: "Learn more about Ojt And Funding inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/ojt-and-funding"
      label="Ojt And Funding"
      section="Other"
    />
  );
}
