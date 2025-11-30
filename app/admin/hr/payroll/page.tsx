import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Payroll | Elevate For Humanity",
  description: "Learn more about Payroll inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/hr/payroll"
      label="Payroll"
      section="Admin & Staff"
    />
  );
}
