import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[programSlug] | Elevate For Humanity",
  description: "Learn more about [programSlug] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/enroll/[programSlug]"
      label="[programSlug]"
      section="Other"
    />
  );
}
