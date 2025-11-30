import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Hub | Elevate For Humanity",
  description: "Learn more about Hub inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/hub"
      label="Hub"
      section="For Students"
    />
  );
}
