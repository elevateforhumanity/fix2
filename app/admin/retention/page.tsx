import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Retention | Elevate For Humanity",
  description: "Learn more about Retention inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/retention"
      label="Retention"
      section="Admin & Staff"
    />
  );
}
