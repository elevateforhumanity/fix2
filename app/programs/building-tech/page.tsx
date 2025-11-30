import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Building Tech | Elevate For Humanity",
  description: "Learn more about Building Tech inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/building-tech"
      label="Building Tech"
      section="Programs"
    />
  );
}
