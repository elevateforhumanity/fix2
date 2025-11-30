import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Demo | Elevate For Humanity",
  description: "Learn more about Demo inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/demo"
      label="Demo"
      section="Other Pages"
    />
  );
}
