import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Sites | Elevate For Humanity",
  description: "Learn more about Sites inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/sites"
      label="Sites"
      section="Other"
    />
  );
}
