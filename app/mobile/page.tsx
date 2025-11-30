import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Mobile | Elevate For Humanity",
  description: "Learn more about Mobile inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/mobile"
      label="Mobile"
      section="Other Pages"
    />
  );
}
