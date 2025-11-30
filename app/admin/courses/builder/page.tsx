import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Builder | Elevate For Humanity",
  description: "Learn more about Builder inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/courses/builder"
      label="Builder"
      section="Admin & Staff"
    />
  );
}
