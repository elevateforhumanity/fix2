import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Micro Classes | Elevate For Humanity",
  description: "Learn more about Micro Classes inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/micro-classes"
      label="Micro Classes"
      section="Other"
    />
  );
}
