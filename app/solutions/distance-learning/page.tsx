import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Distance Learning | Elevate For Humanity",
  description: "Learn more about Distance Learning inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/solutions/distance-learning"
      label="Distance Learning"
      section="Other Pages"
    />
  );
}
