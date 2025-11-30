import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Healthcare Administration | Elevate For Humanity",
  description: "Learn more about Healthcare Administration inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/healthcare-administration"
      label="Healthcare Administration"
      section="Programs"
    />
  );
}
