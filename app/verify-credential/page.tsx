import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Verify Credential | Elevate For Humanity",
  description: "Learn more about Verify Credential inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/verify-credential"
      label="Verify Credential"
      section="Other Pages"
    />
  );
}
