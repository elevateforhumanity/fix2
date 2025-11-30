import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Live Qa | Elevate For Humanity",
  description: "Learn more about Live Qa inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/portal/live-qa"
      label="Live Qa"
      section="Program Holders"
    />
  );
}
