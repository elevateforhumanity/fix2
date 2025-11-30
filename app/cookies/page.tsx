import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Cookies | Elevate For Humanity",
  description: "Learn more about Cookies inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/cookies"
      label="Cookies"
      section="Other Pages"
    />
  );
}
