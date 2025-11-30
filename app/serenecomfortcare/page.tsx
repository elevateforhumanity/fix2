import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Serenecomfortcare | Elevate For Humanity",
  description: "Learn more about Serenecomfortcare inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/serenecomfortcare"
      label="Serenecomfortcare"
      section="Special Programs"
    />
  );
}
