import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Users | Elevate For Humanity",
  description: "Learn more about Users inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/users"
      label="Users"
      section="Admin & Staff"
    />
  );
}
