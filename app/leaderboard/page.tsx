import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Leaderboard | Elevate For Humanity",
  description: "Learn more about Leaderboard inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/leaderboard"
      label="Leaderboard"
      section="Other Pages"
    />
  );
}
