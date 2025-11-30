import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "About | Elevate For Humanity",
  description: "Learn more about About inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/urban-build-crew/about"
      label="About"
      section="Special Programs"
    />
  );
}
