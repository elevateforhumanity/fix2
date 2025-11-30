import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "K12 | Elevate For Humanity",
  description: "Learn more about K12 inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/solutions/k12"
      label="K12"
      section="Other Pages"
    />
  );
}
