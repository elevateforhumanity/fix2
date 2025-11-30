import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Follow Ups | Elevate For Humanity",
  description: "Learn more about Follow Ups inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/workforce-board/follow-ups"
      label="Follow Ups"
      section="Boards"
    />
  );
}
