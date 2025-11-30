import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "All Pages | Elevate For Humanity",
  description: "Learn more about All Pages inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/all-pages"
      label="All Pages"
      section="Other Pages"
    />
  );
}
