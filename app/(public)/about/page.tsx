import type { Metadata } from "next";
import { PublicUnderDevelopment } from "@/components/public-under-development";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <PublicUnderDevelopment
      index="02"
      title="About Us"
      description="Our story, values, and the team behind Malveda Builders are being put together. Check back soon to learn more about how we build."
    />
  );
}
