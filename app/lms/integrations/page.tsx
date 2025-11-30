import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Integrations | Elevate For Humanity",
  description: "Learn more about Integrations inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/integrations"
      label="Integrations"
      section="LMS"
    />
  );
}
