import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Compare | Elevate For Humanity",
  description: "Learn more about Compare inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/compare"
      label="Compare"
      section="Other Pages"
    />
  );
}
