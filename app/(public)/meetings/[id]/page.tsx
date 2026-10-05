import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';
import DeleteMeetingButton from '@/components/DeleteMeetingButton';

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  // Guard against non-numeric slugs like /meetings/abc
  if (Number.isNaN(meetingId)) {
    notFound();
  }

  // Fetch directly from Neon via server database helper
  const meeting = await getMeetingById(meetingId);

  // If no meeting exists with that ID, trigger Next.js notFound()
  if (!meeting) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Action Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/meetings"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          ← Back to Meetings
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Edit Meeting
          </Link>
          <DeleteMeetingButton id={meeting.id} />
        </div>
      </div>

      {/* Existing Meeting Detail View */}
      <MeetingDetail meeting={meeting} />
    </main>
  );
}