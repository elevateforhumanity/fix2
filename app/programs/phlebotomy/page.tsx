import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Phlebotomy | Elevate For Humanity",
  description: "Learn more about Phlebotomy inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/phlebotomy"
      label="Phlebotomy"
      section="Programs"
    />
  );
}
