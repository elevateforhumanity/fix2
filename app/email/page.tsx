import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Email | Elevate For Humanity",
  description: "Learn more about Email inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/email"
      label="Email"
      section="Other Pages"
    />
  );
}
