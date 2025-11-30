import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Ai Chat | Elevate For Humanity",
  description: "Learn more about Ai Chat inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/ai-chat"
      label="Ai Chat"
      section="Other"
    />
  );
}
