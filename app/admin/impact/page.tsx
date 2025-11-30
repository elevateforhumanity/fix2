import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Impact | Elevate For Humanity",
  description: "Learn more about Impact inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/impact"
      label="Impact"
      section="Admin & Staff"
    />
  );
}
