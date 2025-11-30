import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Emergency Health Safety Tech | Elevate For Humanity",
  description: "Learn more about Emergency Health Safety Tech inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/emergency-health-safety-tech"
      label="Emergency Health Safety Tech"
      section="Programs"
    />
  );
}
