import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <main className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">404 - Meeting Not Found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        The sacrament meeting you are trying to edit could not be found or does not exist.
      </p>
      <Link
        href="/meetings"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
      >
        Return to Meetings
      </Link>
    </main>
  );
}