import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Hvac Tech | Elevate For Humanity",
  description: "Learn more about Hvac Tech inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/hvac-tech"
      label="Hvac Tech"
      section="Programs"
    />
  );
}
