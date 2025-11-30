import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Unauthorized | Elevate For Humanity",
  description: "Learn more about Unauthorized inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/unauthorized"
      label="Unauthorized"
      section="Other Pages"
    />
  );
}
