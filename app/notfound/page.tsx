import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Notfound | Elevate For Humanity",
  description: "Learn more about Notfound inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/notfound"
      label="Notfound"
      section="Other"
    />
  );
}
