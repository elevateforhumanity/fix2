import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[slug] | Elevate For Humanity",
  description: "Learn more about [slug] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/enroll/[slug]"
      label="[slug]"
      section="For Students"
    />
  );
}
