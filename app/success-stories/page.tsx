import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Success Stories | Elevate For Humanity",
  description: "Learn more about Success Stories inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/success-stories"
      label="Success Stories"
      section="Main Pages"
    />
  );
}
