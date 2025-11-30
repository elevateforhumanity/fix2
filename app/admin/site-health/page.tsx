import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Site Health | Elevate For Humanity",
  description: "Learn more about Site Health inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/site-health"
      label="Site Health"
      section="Admin & Staff"
    />
  );
}
