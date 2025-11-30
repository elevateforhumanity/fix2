import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Admin | Elevate For Humanity",
  description: "Learn more about Admin inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin"
      label="Admin"
      section="Admin & Staff"
    />
  );
}
