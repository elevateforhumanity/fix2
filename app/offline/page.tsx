import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Offline | Elevate For Humanity",
  description: "Learn more about Offline inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/offline"
      label="Offline"
      section="Other"
    />
  );
}
