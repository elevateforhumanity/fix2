import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Enrollment | Elevate For Humanity",
  description: "Learn more about Enrollment inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/enrollment"
      label="Enrollment"
      section="Admin & Staff"
    />
  );
}
