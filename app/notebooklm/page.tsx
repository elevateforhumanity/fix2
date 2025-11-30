import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Notebooklm | Elevate For Humanity",
  description: "Learn more about Notebooklm inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/notebooklm"
      label="Notebooklm"
      section="Other Pages"
    />
  );
}
