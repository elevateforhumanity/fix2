import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Partner Enrollments | Elevate For Humanity",
  description: "Learn more about Partner Enrollments inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/partner-enrollments"
      label="Partner Enrollments"
      section="Admin & Staff"
    />
  );
}
