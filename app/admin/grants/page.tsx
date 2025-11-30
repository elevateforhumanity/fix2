import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Grants | Elevate For Humanity",
  description: "Learn more about Grants inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/grants"
      label="Grants"
      section="Admin & Staff"
    />
  );
}
