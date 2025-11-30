import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Security | Elevate For Humanity",
  description: "Learn more about Security inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/security"
      label="Security"
      section="Admin & Staff"
    />
  );
}
