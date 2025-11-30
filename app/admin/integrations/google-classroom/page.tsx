import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Google Classroom | Elevate For Humanity",
  description: "Learn more about Google Classroom inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/integrations/google-classroom"
      label="Google Classroom"
      section="Admin & Staff"
    />
  );
}
