import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Search | Elevate For Humanity",
  description: "Learn more about Search inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/search"
      label="Search"
      section="Other Pages"
    />
  );
}
