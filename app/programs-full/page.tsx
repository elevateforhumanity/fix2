import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Programs Full | Elevate For Humanity",
  description: "Learn more about Programs Full inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs-full"
      label="Programs Full"
      section="Programs"
    />
  );
}
