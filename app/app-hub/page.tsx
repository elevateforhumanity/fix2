import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "App Hub | Elevate For Humanity",
  description: "Learn more about App Hub inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/app-hub"
      label="App Hub"
      section="Other Pages"
    />
  );
}
