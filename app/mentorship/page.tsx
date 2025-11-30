import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Mentorship | Elevate For Humanity",
  description: "Learn more about Mentorship inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/mentorship"
      label="Mentorship"
      section="Other"
    />
  );
}
