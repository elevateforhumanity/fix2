import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "File Manager | Elevate For Humanity",
  description: "Learn more about File Manager inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/file-manager"
      label="File Manager"
      section="Other"
    />
  );
}
