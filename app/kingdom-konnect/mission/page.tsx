import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Mission | Elevate For Humanity",
  description: "Learn more about Mission inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/kingdom-konnect/mission"
      label="Mission"
      section="Special Programs"
    />
  );
}
