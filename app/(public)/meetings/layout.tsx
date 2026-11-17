import type { ReactNode } from "react";
import Link from "next/link";

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <nav
        aria-label="Meetings navigation"
        className="flex flex-wrap gap-4 border-b border-slate-200 pb-4 print:hidden"
      >
        <Link
          href="/meetings"
          className="text-blue-800 hover:underline"
        >
          All meetings
        </Link>

        <Link
          href="/meetings/current"
          className="text-blue-800 hover:underline"
        >
          Current Sunday
        </Link>
      </nav>

      {children}
    </div>
  );
}