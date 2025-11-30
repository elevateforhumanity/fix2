import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Deploy | Elevate For Humanity",
  description: "Learn more about Deploy inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/copilot/deploy"
      label="Deploy"
      section="Admin & Staff"
    />
  );
}
