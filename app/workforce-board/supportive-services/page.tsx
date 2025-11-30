import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Supportive Services | Elevate For Humanity",
  description: "Learn more about Supportive Services inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/workforce-board/supportive-services"
      label="Supportive Services"
      section="Boards"
    />
  );
}
