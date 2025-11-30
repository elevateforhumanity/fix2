import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[programId] | Elevate For Humanity",
  description: "Learn more about [programId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/instructor/[programId]"
      label="[programId]"
      section="For Students"
    />
  );
}
