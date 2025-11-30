import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Alumni | Elevate For Humanity",
  description: "Learn more about Alumni inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/alumni"
      label="Alumni"
      section="Other"
    />
  );
}
