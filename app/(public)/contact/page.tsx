import type { Metadata } from "next";
import { PublicUnderDevelopment } from "@/components/public-under-development";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PublicUnderDevelopment
      index="05"
      title="Contact"
      description="Our contact page is being set up. We'll soon have the details you need to reach the Malveda Builders team."
    />
  );
}
