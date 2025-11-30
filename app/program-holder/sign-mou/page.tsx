import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Sign Mou | Elevate For Humanity",
  description: "Learn more about Sign Mou inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/sign-mou"
      label="Sign Mou"
      section="Program Holders"
    />
  );
}
