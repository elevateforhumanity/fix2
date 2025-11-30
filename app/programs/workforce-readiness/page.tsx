import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Workforce Readiness | Elevate For Humanity",
  description: "Learn more about Workforce Readiness inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/workforce-readiness"
      label="Workforce Readiness"
      section="Programs"
    />
  );
}
