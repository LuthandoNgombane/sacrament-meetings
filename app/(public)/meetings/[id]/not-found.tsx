// app/(public)/meetings/[id]/not-found.tsx
import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <main className="flex flex-col items-center justify-center py-16 text-center px-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        404 - Meeting Not Found
      </h2>
      <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
        The sacrament meeting program you are looking for could not be found or has been removed.
      </p>
      <Link
        href="/meetings"
        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
      >
        Browse All Meetings
      </Link>
    </main>
  );
}