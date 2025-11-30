import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Platform | Elevate For Humanity",
  description: "Learn more about Platform inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/platform"
      label="Platform"
      section="Other Pages"
    />
  );
}
