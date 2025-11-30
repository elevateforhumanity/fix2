import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Elevate For Humanity",
  description: "Learn more about Privacy Policy inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/privacy-policy"
      label="Privacy Policy"
      section="Other Pages"
    />
  );
}
