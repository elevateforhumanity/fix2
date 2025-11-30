import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Media Showcase | Elevate For Humanity",
  description: "Learn more about Media Showcase inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/media-showcase"
      label="Media Showcase"
      section="Other"
    />
  );
}
