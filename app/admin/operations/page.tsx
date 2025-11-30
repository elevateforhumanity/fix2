import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Operations | Elevate For Humanity",
  description: "Learn more about Operations inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/operations"
      label="Operations"
      section="Admin & Staff"
    />
  );
}
