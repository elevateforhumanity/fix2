import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Higher Ed | Elevate For Humanity",
  description: "Learn more about Higher Ed inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/solutions/higher-ed"
      label="Higher Ed"
      section="Other"
    />
  );
}
