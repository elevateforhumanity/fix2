import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Workforce Boards | Elevate For Humanity",
  description: "Learn more about Workforce Boards inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/platform/workforce-boards"
      label="Workforce Boards"
      section="Other"
    />
  );
}
