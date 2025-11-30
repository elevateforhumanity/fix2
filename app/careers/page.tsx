import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Careers | Elevate For Humanity",
  description: "Learn more about Careers inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/careers"
      label="Careers"
      section="Career Services"
    />
  );
}
