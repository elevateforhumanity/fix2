import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Video | Elevate For Humanity",
  description: "Learn more about Video inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/video"
      label="Video"
      section="Other Pages"
    />
  );
}
