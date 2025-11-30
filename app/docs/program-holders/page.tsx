import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Program Holders | Elevate For Humanity",
  description: "Learn more about Program Holders inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/docs/program-holders"
      label="Program Holders"
      section="Other Pages"
    />
  );
}
