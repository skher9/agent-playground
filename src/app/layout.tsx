import type { Metadata } from "next";
import "./globals.css";

import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata: Metadata = {
  title: "Starter App",
  description: "Next.js starter for generated apps",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <DarkModeToggle />
        {children}
      </body>
    </html>
  );
}
