import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Program Generator | Elevate For Humanity",
  description: "Learn more about Program Generator inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/program-generator"
      label="Program Generator"
      section="Admin & Staff"
    />
  );
}
