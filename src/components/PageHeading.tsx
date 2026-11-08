import type { ReactNode } from "react";

export default function PageHeading({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl font-semibold">{children}</h1>;
}
