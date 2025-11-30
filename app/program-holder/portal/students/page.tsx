import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Students | Elevate For Humanity",
  description: "Learn more about Students inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/portal/students"
      label="Students"
      section="Program Holders"
    />
  );
}
