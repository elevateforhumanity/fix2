import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Vita | Elevate For Humanity",
  description: "Learn more about Vita inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/vita"
      label="Vita"
      section="Other"
    />
  );
}
