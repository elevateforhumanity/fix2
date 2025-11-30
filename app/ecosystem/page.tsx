import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Ecosystem | Elevate For Humanity",
  description: "Learn more about Ecosystem inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/ecosystem"
      label="Ecosystem"
      section="Other"
    />
  );
}
