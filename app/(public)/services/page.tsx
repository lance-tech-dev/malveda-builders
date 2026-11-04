import type { Metadata } from "next";
import { PublicUnderDevelopment } from "@/components/public-under-development";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <PublicUnderDevelopment
      index="03"
      title="Services"
      description="A full overview of our architectural design, construction, and design-build services is on its way."
    />
  );
}
