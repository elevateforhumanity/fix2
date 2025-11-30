import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Docs | Elevate For Humanity",
  description: "Learn more about Docs inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/docs"
      label="Docs"
      section="Other Pages"
    />
  );
}
