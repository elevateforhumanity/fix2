import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Peer Recovery Coach | Elevate For Humanity",
  description: "Learn more about Peer Recovery Coach inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/peer-recovery-coach"
      label="Peer Recovery Coach"
      section="Programs"
    />
  );
}
