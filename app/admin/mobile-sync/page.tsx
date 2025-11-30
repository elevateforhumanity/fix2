import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Mobile Sync | Elevate For Humanity",
  description: "Learn more about Mobile Sync inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/mobile-sync"
      label="Mobile Sync"
      section="Admin & Staff"
    />
  );
}
