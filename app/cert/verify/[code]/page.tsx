import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[code] | Elevate For Humanity",
  description: "Learn more about [code] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/cert/verify/[code]"
      label="[code]"
      section="Other"
    />
  );
}
