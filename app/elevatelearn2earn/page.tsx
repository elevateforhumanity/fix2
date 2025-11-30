import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Elevatelearn2earn | Elevate For Humanity",
  description: "Learn more about Elevatelearn2earn inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/elevatelearn2earn"
      label="Elevatelearn2earn"
      section="Other"
    />
  );
}
