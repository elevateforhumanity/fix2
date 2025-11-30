import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Dol | Elevate For Humanity",
  description: "Learn more about Dol inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/funding/dol"
      label="Dol"
      section="Funding"
    />
  );
}
