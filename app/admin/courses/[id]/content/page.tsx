import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Content | Elevate For Humanity",
  description: "Learn more about Content inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/courses/[id]/content"
      label="Content"
      section="Admin & Staff"
    />
  );
}
