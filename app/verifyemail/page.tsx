import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Verifyemail | Elevate For Humanity",
  description: "Learn more about Verifyemail inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/verifyemail"
      label="Verifyemail"
      section="Other"
    />
  );
}
