import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Financial Aid | Elevate For Humanity",
  description: "Learn more about Financial Aid inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/financial-aid"
      label="Financial Aid"
      section="Other"
    />
  );
}
