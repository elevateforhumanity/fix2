import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Share | Elevate For Humanity",
  description: "Learn more about Share inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/share"
      label="Share"
      section="Other Pages"
    />
  );
}
