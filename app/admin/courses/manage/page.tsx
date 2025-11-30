import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Manage | Elevate For Humanity",
  description: "Learn more about Manage inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/courses/manage"
      label="Manage"
      section="Admin & Staff"
    />
  );
}
