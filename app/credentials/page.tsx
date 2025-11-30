import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Credentials | Elevate For Humanity",
  description: "Learn more about Credentials inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/credentials"
      label="Credentials"
      section="Credentials"
    />
  );
}
