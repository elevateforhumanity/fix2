import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Completions | Elevate For Humanity",
  description: "Learn more about Completions inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/completions"
      label="Completions"
      section="Admin & Staff"
    />
  );
}
