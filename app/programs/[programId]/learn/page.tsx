import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Learn | Elevate For Humanity",
  description: "Learn more about Learn inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/[programId]/learn"
      label="Learn"
      section="Programs"
    />
  );
}
