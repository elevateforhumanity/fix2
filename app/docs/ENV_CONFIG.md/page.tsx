import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "ENV_CONFIG.md | Elevate For Humanity",
  description: "Learn more about ENV_CONFIG.md inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/docs/ENV_CONFIG.md"
      label="ENV_CONFIG.md"
      section="Documents"
    />
  );
}
