import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Referrals | Elevate For Humanity",
  description: "Learn more about Referrals inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/board/referrals"
      label="Referrals"
      section="Boards"
    />
  );
}
