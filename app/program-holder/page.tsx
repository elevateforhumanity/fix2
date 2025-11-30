import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Program Holder | Elevate For Humanity",
  description: "Learn more about Program Holder inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder"
      label="Program Holder"
      section="Other Pages"
    />
  );
}
