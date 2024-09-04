import { ReactNode } from "react";

export default function DetailLayout({ children }: { children: ReactNode }) {
  return <div className="flex-auto overflow-hidden">{children}</div>;
}
