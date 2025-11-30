import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[programId] | Elevate For Humanity",
  description: "Learn more about [programId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/[programId]"
      label="[programId]"
      section="Programs"
    />
  );
}
