import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Post Job | Elevate For Humanity",
  description: "Learn more about Post Job inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/employer/post-job"
      label="Post Job"
      section="Other"
    />
  );
}
