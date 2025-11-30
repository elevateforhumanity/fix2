import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Dashboard Enhanced | Elevate For Humanity",
  description: "Learn more about Dashboard Enhanced inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/dashboard-enhanced"
      label="Dashboard Enhanced"
      section="Admin & Staff"
    />
  );
}
