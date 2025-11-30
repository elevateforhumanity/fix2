import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Revenue | Elevate For Humanity",
  description: "Learn more about Revenue inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/grants/revenue"
      label="Revenue"
      section="Admin & Staff"
    />
  );
}
