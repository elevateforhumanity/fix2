import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Prog Business Apprentice | Elevate For Humanity",
  description: "Learn more about Prog Business Apprentice inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/checkout/prog-business-apprentice"
      label="Prog Business Apprentice"
      section="Other Pages"
    />
  );
}
