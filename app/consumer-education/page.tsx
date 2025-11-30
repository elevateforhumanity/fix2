import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Consumer Education | Elevate For Humanity",
  description: "Learn more about Consumer Education inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/consumer-education"
      label="Consumer Education"
      section="Other Pages"
    />
  );
}
