import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Analytics | Elevate For Humanity",
  description: "Learn more about Analytics inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/analytics"
      label="Analytics"
      section="Admin & Staff"
    />
  );
}
