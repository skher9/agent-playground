import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-8 text-sm text-gray-600">
      <p>© 2026 Agent Playground</p>
      <Link href="/">Home</Link>
    </footer>
  );
}
