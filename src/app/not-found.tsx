import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2">We couldn&apos;t find the page you were looking for.</p>
      <p className="mt-4">
        <Link className="underline" href="/">
          Go back home
        </Link>
      </p>
    </main>
  );
}
