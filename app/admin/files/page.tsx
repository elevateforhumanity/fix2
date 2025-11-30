import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Files | Elevate For Humanity",
  description: "Learn more about Files inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/files"
      label="Files"
      section="Admin & Staff"
    />
  );
}
