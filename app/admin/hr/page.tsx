import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Hr | Elevate For Humanity",
  description: "Learn more about Hr inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/hr"
      label="Hr"
      section="Admin & Staff"
    />
  );
}
