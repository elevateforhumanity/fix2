import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[documentId] | Elevate For Humanity",
  description: "Learn more about [documentId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/sign/[documentId]"
      label="[documentId]"
      section="Other"
    />
  );
}
