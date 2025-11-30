import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Demos | Elevate For Humanity",
  description: "Learn more about Demos inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/demos"
      label="Demos"
      section="Other"
    />
  );
}
