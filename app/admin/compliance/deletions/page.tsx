import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Deletions | Elevate For Humanity",
  description: "Learn more about Deletions inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/compliance/deletions"
      label="Deletions"
      section="Admin & Staff"
    />
  );
}
