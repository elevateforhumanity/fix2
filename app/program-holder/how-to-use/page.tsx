import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "How To Use | Elevate For Humanity",
  description: "Learn more about How To Use inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/how-to-use"
      label="How To Use"
      section="Program Holders"
    />
  );
}
