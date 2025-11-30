import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Signup | Elevate For Humanity",
  description: "Learn more about Signup inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/signup"
      label="Signup"
      section="Other Pages"
    />
  );
}
