import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Partner Application | Elevate For Humanity",
  description: "Learn more about Partner Application inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/partner-application"
      label="Partner Application"
      section="Other Pages"
    />
  );
}
