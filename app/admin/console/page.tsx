import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Console | Elevate For Humanity",
  description: "Learn more about Console inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/console"
      label="Console"
      section="Admin & Staff"
    />
  );
}
