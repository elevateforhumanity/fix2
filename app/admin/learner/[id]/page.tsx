import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[id] | Elevate For Humanity",
  description: "Learn more about [id] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/learner/[id]"
      label="[id]"
      section="Admin & Staff"
    />
  );
}
