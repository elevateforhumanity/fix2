import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Aitutor | Elevate For Humanity",
  description: "Learn more about Aitutor inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/aitutor"
      label="Aitutor"
      section="Other"
    />
  );
}
