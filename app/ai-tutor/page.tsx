import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Ai Tutor | Elevate For Humanity",
  description: "Learn more about Ai Tutor inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/ai-tutor"
      label="Ai Tutor"
      section="Other"
    />
  );
}
