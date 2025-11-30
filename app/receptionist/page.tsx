import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Receptionist | Elevate For Humanity",
  description: "Learn more about Receptionist inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/receptionist"
      label="Receptionist"
      section="Other Pages"
    />
  );
}
