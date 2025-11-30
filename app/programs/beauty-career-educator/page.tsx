import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Beauty Career Educator | Elevate For Humanity",
  description: "Learn more about Beauty Career Educator inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/beauty-career-educator"
      label="Beauty Career Educator"
      section="Programs"
    />
  );
}
