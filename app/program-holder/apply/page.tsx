import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Apply | Elevate For Humanity",
  description: "Learn more about Apply inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/apply"
      label="Apply"
      section="Other Pages"
    />
  );
}
