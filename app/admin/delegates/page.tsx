import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Delegates | Elevate For Humanity",
  description: "Learn more about Delegates inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/delegates"
      label="Delegates"
      section="Admin & Staff"
    />
  );
}
