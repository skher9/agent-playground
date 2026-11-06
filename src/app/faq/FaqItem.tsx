"use client";

import { useState } from "react";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b py-3">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left font-medium"
      >
        {question}
      </button>
      {open && <p className="mt-2 text-sm">{answer}</p>}
    </li>
  );
}
