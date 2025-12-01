import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "About | Elevate For Humanity",
  description: "Learn more about Elevate For Humanity and our mission to connect individuals with life-changing career opportunities through free workforce training.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/about"
      label="About"
      section="Main Pages"
    />
  );
}
