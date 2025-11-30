import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Resetpassword | Elevate For Humanity",
  description: "Learn more about Resetpassword inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/resetpassword"
      label="Resetpassword"
      section="Other"
    />
  );
}
