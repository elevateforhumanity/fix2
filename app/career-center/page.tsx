import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Career Center | Elevate For Humanity",
  description: "Learn more about Career Center inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/career-center"
      label="Career Center"
      section="Career Services"
    />
  );
}
