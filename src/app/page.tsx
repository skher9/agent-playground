import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Hello from the starter app</h1>
      <Link href="/about" className="mt-4 inline-block text-blue-600 underline">
        About us
      </Link>
    </main>
  );
}
