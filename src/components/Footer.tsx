import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex gap-2 p-8 text-sm text-gray-600">
      <span>© 2026 Agent Playground</span>
      <Link href="/">Home</Link>
    </footer>
  );
}
