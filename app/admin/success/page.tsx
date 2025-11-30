import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Success | Elevate For Humanity",
  description: "Learn more about Success inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/success"
      label="Success"
      section="Admin & Staff"
    />
  );
}
