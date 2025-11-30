import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Government | Elevate For Humanity",
  description: "Learn more about Government inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/government"
      label="Government"
      section="Other Pages"
    />
  );
}
