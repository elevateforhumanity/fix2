import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Communityhub | Elevate For Humanity",
  description: "Learn more about Communityhub inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/community/communityhub"
      label="Communityhub"
      section="Community"
    />
  );
}
