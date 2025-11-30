import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Login | Elevate For Humanity",
  description: "Learn more about Login inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/login"
      label="Login"
      section="Admin & Staff"
    />
  );
}
