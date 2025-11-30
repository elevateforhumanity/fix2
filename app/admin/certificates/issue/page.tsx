import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Issue | Elevate For Humanity",
  description: "Learn more about Issue inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/certificates/issue"
      label="Issue"
      section="Admin & Staff"
    />
  );
}
