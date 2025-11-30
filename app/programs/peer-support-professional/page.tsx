import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Peer Support Professional | Elevate For Humanity",
  description: "Learn more about Peer Support Professional inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/peer-support-professional"
      label="Peer Support Professional"
      section="Programs"
    />
  );
}
