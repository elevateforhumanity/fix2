import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Create Program | Elevate For Humanity",
  description: "Learn more about Create Program inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/partners/create-program"
      label="Create Program"
      section="Community"
    />
  );
}
