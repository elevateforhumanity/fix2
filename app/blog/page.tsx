import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Blog | Elevate For Humanity",
  description: "Learn more about Blog inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/blog"
      label="Blog"
      section="Main Pages"
    />
  );
}
