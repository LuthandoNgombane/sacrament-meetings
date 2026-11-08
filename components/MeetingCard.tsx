import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-blue-800 hover:underline"
        >
          Meeting: <time dateTime={meeting.date}>{meeting.date}</time>
        </Link>
      </h2>

      <p className="mt-2 capitalize">{meeting.meetingType} meeting</p>
      <p className="mt-2 text-slate-600">
        Conducting: {meeting.conducting}
      </p>
    </article>
  );
}