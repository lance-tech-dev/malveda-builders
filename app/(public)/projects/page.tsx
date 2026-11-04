import type { Metadata } from "next";
import { PublicUnderDevelopment } from "@/components/public-under-development";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <PublicUnderDevelopment
      index="04"
      title="Projects"
      description="Our portfolio of residential, commercial, and industrial projects is currently being curated."
    />
  );
}
