import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Profile | Elevate For Humanity",
  description: "Learn more about Profile inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/student/profile"
      label="Profile"
      section="For Students"
    />
  );
}
