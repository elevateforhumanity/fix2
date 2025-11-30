import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Forgot Password | Elevate For Humanity",
  description: "Learn more about Forgot Password inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/auth/forgot-password"
      label="Forgot Password"
      section="Other"
    />
  );
}
