import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Audit Logs | Elevate For Humanity",
  description: "Learn more about Audit Logs inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/audit-logs"
      label="Audit Logs"
      section="Admin & Staff"
    />
  );
}
