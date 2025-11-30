import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Interview Prep | Elevate For Humanity",
  description: "Learn more about Interview Prep inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/careers/interview-prep"
      label="Interview Prep"
      section="Other Pages"
    />
  );
}
