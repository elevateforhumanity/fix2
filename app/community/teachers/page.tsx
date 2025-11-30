import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Teachers | Elevate For Humanity",
  description: "Learn more about Teachers inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/community/teachers"
      label="Teachers"
      section="Community"
    />
  );
}
