import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Admins | Elevate For Humanity",
  description: "Learn more about Admins inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/docs/admins"
      label="Admins"
      section="Documents"
    />
  );
}
