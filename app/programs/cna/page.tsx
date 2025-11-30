import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Cna | Elevate For Humanity",
  description: "Learn more about Cna inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/cna"
      label="Cna"
      section="Programs"
    />
  );
}
