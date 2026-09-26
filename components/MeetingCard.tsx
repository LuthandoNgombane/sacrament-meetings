import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

const badgeColors: Record<SacramentMeeting['meetingType'], string> = {
  regular: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  testimony: 'bg-blue-100 text-blue-800 border-blue-300',
  stake: 'bg-amber-100 text-amber-800 border-amber-300',
  general: 'bg-purple-100 text-purple-800 border-purple-300',
};

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-slate-900 dark:text-white">
          {new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
            badgeColors[meeting.meetingType]
          }`}
        >
          {meeting.meetingType}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
        <p><strong className="text-slate-700 dark:text-slate-200">Presiding:</strong> {meeting.presiding}</p>
        <p><strong className="text-slate-700 dark:text-slate-200">Conducting:</strong> {meeting.conducting}</p>
        {meeting.speakers.length > 0 && (
          <p className="truncate">
            <strong className="text-slate-700 dark:text-slate-200">Speakers:</strong>{' '}
            {meeting.speakers.map((s) => s.name).join(', ')}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-right">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
        >
          View Program &rarr;
        </Link>
      </div>
    </div>
  );
}