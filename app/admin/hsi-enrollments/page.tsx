import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Hsi Enrollments | Elevate For Humanity",
  description: "Learn more about Hsi Enrollments inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/hsi-enrollments"
      label="Hsi Enrollments"
      section="Admin & Staff"
    />
  );
}
