import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Philanthropy | Elevate For Humanity",
  description: "Learn more about Philanthropy inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/philanthropy"
      label="Philanthropy"
      section="Other Pages"
    />
  );
}
