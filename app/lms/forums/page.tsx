import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Forums | Elevate For Humanity",
  description: "Learn more about Forums inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/forums"
      label="Forums"
      section="LMS"
    />
  );
}
