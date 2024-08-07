import { ReactNode } from "react";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <div className="flex-auto">{children}</div>;
}
