import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link href="/">Back to home</Link>
    </main>
  );
}
