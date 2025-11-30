import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Learning Center | Elevate For Humanity",
  description: "Learn more about Learning Center inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/training/learning-center"
      label="Learning Center"
      section="Other Pages"
    />
  );
}
