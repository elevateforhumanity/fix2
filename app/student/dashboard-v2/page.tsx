import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Dashboard V2 | Elevate For Humanity",
  description: "Learn more about Dashboard V2 inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/dashboard-v2"
      label="Dashboard V2"
      section="For Students"
    />
  );
}
