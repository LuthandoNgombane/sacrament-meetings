'use client';

import Link from 'next/link';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p>The app couldn’t complete your request. Please try again.</p>
      {error.digest && <p>Error reference: {error.digest}</p>}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-blue-900 px-4 py-2 text-white"
        >
          Try Again
        </button>
        <Link href="/meetings" className="text-blue-900 underline">
          Back to meetings
        </Link>
      </div>
    </section>
  );
}