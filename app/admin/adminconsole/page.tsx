import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Adminconsole | Elevate For Humanity",
  description: "Learn more about Adminconsole inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/adminconsole"
      label="Adminconsole"
      section="Admin & Staff"
    />
  );
}
