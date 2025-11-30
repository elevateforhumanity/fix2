import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Terms Of Service | Elevate For Humanity",
  description: "Learn more about Terms Of Service inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/terms-of-service"
      label="Terms Of Service"
      section="Other Pages"
    />
  );
}
