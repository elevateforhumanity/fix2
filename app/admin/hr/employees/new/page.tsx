import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "New | Elevate For Humanity",
  description: "Learn more about New inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/hr/employees/new"
      label="New"
      section="Admin & Staff"
    />
  );
}
