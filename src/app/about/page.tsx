import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
};

export default function About() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">About us</h1>
      <p className="mt-4">
        We are a small team of engineers and designers who build dependable
        software together.
      </p>
    </main>
  );
}
