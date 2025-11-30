import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Participants | Elevate For Humanity",
  description: "Learn more about Participants inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/workforce-board/participants"
      label="Participants"
      section="Other Pages"
    />
  );
}
