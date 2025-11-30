import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Programs Lms | Elevate For Humanity",
  description: "Learn more about Programs Lms inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs-lms"
      label="Programs Lms"
      section="Programs"
    />
  );
}
