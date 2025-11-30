import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Applicants Live | Elevate For Humanity",
  description: "Learn more about Applicants Live inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/applicants-live"
      label="Applicants Live"
      section="Admin & Staff"
    />
  );
}
