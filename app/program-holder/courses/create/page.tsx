import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Create | Elevate For Humanity",
  description: "Learn more about Create inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/program-holder/courses/create"
      label="Create"
      section="Program Holders"
    />
  );
}
