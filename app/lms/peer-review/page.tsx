import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Peer Review | Elevate For Humanity",
  description: "Learn more about Peer Review inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/peer-review"
      label="Peer Review"
      section="LMS"
    />
  );
}
