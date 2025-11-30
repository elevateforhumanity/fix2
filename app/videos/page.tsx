import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Videos | Elevate For Humanity",
  description: "Learn more about Videos inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/videos"
      label="Videos"
      section="Other Pages"
    />
  );
}
