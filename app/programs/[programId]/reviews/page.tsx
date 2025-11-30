import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Reviews | Elevate For Humanity",
  description: "Learn more about Reviews inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/programs/[programId]/reviews"
      label="Reviews"
      section="Programs"
    />
  );
}
