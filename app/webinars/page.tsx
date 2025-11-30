import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Webinars | Elevate For Humanity",
  description: "Learn more about Webinars inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/webinars"
      label="Webinars"
      section="Other"
    />
  );
}
