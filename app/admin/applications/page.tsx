import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Applications | Elevate For Humanity",
  description: "Learn more about Applications inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/applications"
      label="Applications"
      section="Admin & Staff"
    />
  );
}
