import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Training Providers | Elevate For Humanity",
  description: "Learn more about Training Providers inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/training-providers"
      label="Training Providers"
      section="Other"
    />
  );
}
