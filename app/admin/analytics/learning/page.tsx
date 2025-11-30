import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Learning | Elevate For Humanity",
  description: "Learn more about Learning inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/analytics/learning"
      label="Learning"
      section="Admin & Staff"
    />
  );
}
