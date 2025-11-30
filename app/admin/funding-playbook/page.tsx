import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Funding Playbook | Elevate For Humanity",
  description: "Learn more about Funding Playbook inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/funding-playbook"
      label="Funding Playbook"
      section="Admin & Staff"
    />
  );
}
