
import type { Metadata } from "next";
import PublicNavbar from "@/components/public-navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Malveda Builders | Architecture & Construction",
    template: "%s | Malveda Builders",
  },
  description:
    "Malveda Builders provides architecture, drafting, and construction services, delivering quality spaces built with precision and craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PublicNavbar />
        {children}
      </body>
    </html>
  );
}
