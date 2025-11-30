import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Migrations | Elevate For Humanity",
  description: "Learn more about Migrations inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/migrations"
      label="Migrations"
      section="Admin & Staff"
    />
  );
}
