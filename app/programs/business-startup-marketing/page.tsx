import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Business Startup Marketing | Elevate For Humanity",
  description: "Learn more about Business Startup Marketing inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/business-startup-marketing"
      label="Business Startup Marketing"
      section="Programs"
    />
  );
}
