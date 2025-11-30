import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Employee | Elevate For Humanity",
  description: "Learn more about Employee inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/employee"
      label="Employee"
      section="HR & Payroll"
    />
  );
}
