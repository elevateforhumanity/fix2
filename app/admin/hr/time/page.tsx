import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Time | Elevate For Humanity",
  description: "Learn more about Time inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/hr/time"
      label="Time"
      section="Admin & Staff"
    />
  );
}
