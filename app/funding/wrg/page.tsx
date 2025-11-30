import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Wrg | Elevate For Humanity",
  description: "Learn more about Wrg inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/funding/wrg"
      label="Wrg"
      section="Funding"
    />
  );
}
