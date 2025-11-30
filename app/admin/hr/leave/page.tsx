import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Leave | Elevate For Humanity",
  description: "Learn more about Leave inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/hr/leave"
      label="Leave"
      section="Admin & Staff"
    />
  );
}
