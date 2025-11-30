import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Groups | Elevate For Humanity",
  description: "Learn more about Groups inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/groups"
      label="Groups"
      section="Other Pages"
    />
  );
}
