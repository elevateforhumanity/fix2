import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Care Team | Elevate For Humanity",
  description: "Learn more about Care Team inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/serene-comfort-care/care-team"
      label="Care Team"
      section="Special Programs"
    />
  );
}
