import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Settings | Elevate For Humanity",
  description: "Learn more about Settings inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/settings"
      label="Settings"
      section="Program Holders"
    />
  );
}
