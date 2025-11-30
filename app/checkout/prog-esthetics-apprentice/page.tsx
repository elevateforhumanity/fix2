import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Prog Esthetics Apprentice | Elevate For Humanity",
  description: "Learn more about Prog Esthetics Apprentice inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/checkout/prog-esthetics-apprentice"
      label="Prog Esthetics Apprentice"
      section="Other Pages"
    />
  );
}
