import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Getstarted | Elevate For Humanity",
  description: "Learn more about Getstarted inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/getstarted"
      label="Getstarted"
      section="Other Pages"
    />
  );
}
