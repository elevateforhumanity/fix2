import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Sheets | Elevate For Humanity",
  description: "Learn more about Sheets inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/sheets"
      label="Sheets"
      section="Other Pages"
    />
  );
}
