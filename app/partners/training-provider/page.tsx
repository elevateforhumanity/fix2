import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Training Provider | Elevate For Humanity",
  description: "Learn more about Training Provider inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/partners/training-provider"
      label="Training Provider"
      section="Community"
    />
  );
}
