import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";
import TeamSection from "@/components/TeamSection";

export const metadata: Metadata = {
  title: "About | Elevate For Humanity",
  description: "Learn more about Elevate For Humanity and our dedicated team working to connect individuals with life-changing career opportunities.",
};

export default function Page() {
  return (
    <>
      <AutoPolishedPage
        route="/about"
        label="About"
        section="Main Pages"
      />
      <TeamSection />
    </>
  );
}
