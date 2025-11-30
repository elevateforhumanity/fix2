import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Home V2 | Elevate For Humanity",
  description: "Learn more about Home V2 inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/home-v2"
      label="Home V2"
      section="Other"
    />
  );
}
