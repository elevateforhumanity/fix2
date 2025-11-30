import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Contact | Elevate For Humanity",
  description: "Learn more about Contact inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/support/contact"
      label="Contact"
      section="Other Pages"
    />
  );
}
