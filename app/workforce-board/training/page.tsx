import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Training | Elevate For Humanity",
  description: "Learn more about Training inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/workforce-board/training"
      label="Training"
      section="Boards"
    />
  );
}
