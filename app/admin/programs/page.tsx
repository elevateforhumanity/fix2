import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Programs | Elevate For Humanity",
  description: "Learn more about Programs inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/programs"
      label="Programs"
      section="Admin & Staff"
    />
  );
}
