import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Grades | Elevate For Humanity",
  description: "Learn more about Grades inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/grades"
      label="Grades"
      section="Program Holders"
    />
  );
}
