import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Meeting not found</h1>
      <p>This meeting may have been deleted or the link may be incorrect.</p>
      <Link href="/meetings" className="text-blue-900 underline">
        Back to meetings
      </Link>
    </section>
  );
}