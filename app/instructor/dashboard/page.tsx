import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Dashboard | Elevate For Humanity",
  description: "Learn more about Dashboard inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/instructor/dashboard"
      label="Dashboard"
      section="Instructor"
    />
  );
}
