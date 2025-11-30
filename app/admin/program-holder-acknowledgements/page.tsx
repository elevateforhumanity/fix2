import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "Program Holder Acknowledgements | Elevate For Humanity",
  description: "Learn more about Program Holder Acknowledgements inside the Elevate For Humanity workforce ecosystem.",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="/admin/program-holder-acknowledgements"
      label="Program Holder Acknowledgements"
      section="Admin & Staff"
    />
  );
}
