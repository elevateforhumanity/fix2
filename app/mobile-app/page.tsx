import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Mobile App | Elevate For Humanity",
  description: "Learn more about Mobile App inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/mobile-app"
      label="Mobile App"
      section="Other"
    />
  );
}
