import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Staff Portal | Elevate For Humanity",
  description: "Learn more about Staff Portal inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/staff-portal"
      label="Staff Portal"
      section="Admin & Staff"
    />
  );
}
