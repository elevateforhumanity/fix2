import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Developers | Elevate For Humanity",
  description: "Learn more about Developers inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/community/developers"
      label="Developers"
      section="Community"
    />
  );
}
