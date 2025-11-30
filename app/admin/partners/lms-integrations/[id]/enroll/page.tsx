import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Enroll | Elevate For Humanity",
  description: "Learn more about Enroll inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/partners/lms-integrations/[id]/enroll"
      label="Enroll"
      section="Admin & Staff"
    />
  );
}
