import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "What We Do | Elevate For Humanity",
  description: "Learn more about What We Do inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/what-we-do"
      label="What We Do"
      section="Other"
    />
  );
}
