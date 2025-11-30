import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Rise Up | Elevate For Humanity",
  description: "Learn more about Rise Up inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/rise-up"
      label="Rise Up"
      section="Programs"
    />
  );
}
