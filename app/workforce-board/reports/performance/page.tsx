import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Performance | Elevate For Humanity",
  description: "Learn more about Performance inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/workforce-board/reports/performance"
      label="Performance"
      section="Other Pages"
    />
  );
}
