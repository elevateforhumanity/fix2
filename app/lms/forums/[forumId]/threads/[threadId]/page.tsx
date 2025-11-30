import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "[threadId] | Elevate For Humanity",
  description: "Learn more about [threadId] inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/lms/forums/[forumId]/threads/[threadId]"
      label="[threadId]"
      section="LMS"
    />
  );
}
