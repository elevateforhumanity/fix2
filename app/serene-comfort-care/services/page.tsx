import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Services | Elevate For Humanity",
  description: "Learn more about Services inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/serene-comfort-care/services"
      label="Services"
      section="Special Programs"
    />
  );
}
