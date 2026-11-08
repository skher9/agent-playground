"use client";

import { useState } from "react";

export default function LikeButton() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setCount((c) => c + 1)}
      className="inline-flex rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {`Like (${count})`}
    </button>
  );
}
