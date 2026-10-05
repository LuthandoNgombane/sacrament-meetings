
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong!</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md text-sm">
        An unexpected error occurred while loading meeting information.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}