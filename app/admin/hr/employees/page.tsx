import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Employees | Elevate For Humanity",
  description: "Learn more about Employees inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/hr/employees"
      label="Employees"
      section="Admin & Staff"
    />
  );
}
