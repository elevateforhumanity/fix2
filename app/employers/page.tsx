import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Employers | Elevate For Humanity",
  description: "Learn more about Employers inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/employers"
      label="Employers"
      section="For Employers"
    />
  );
}
