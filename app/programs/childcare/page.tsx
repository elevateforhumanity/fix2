import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Childcare | Elevate For Humanity",
  description: "Learn more about Childcare inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/childcare"
      label="Childcare"
      section="Programs"
    />
  );
}
