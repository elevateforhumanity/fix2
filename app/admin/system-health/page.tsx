import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "System Health | Elevate For Humanity",
  description: "Learn more about System Health inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/system-health"
      label="System Health"
      section="Admin & Staff"
    />
  );
}
