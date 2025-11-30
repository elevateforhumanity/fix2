import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Cdl | Elevate For Humanity",
  description: "Learn more about Cdl inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/cdl"
      label="Cdl"
      section="Programs"
    />
  );
}
