import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from "@/lib/actions";

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

       <Link href={`/meetings/${meeting.id}/edit`} className="text-blue-900 underline">
          Edit meeting on {meeting.date}
        </Link>


      <p className="mt-2 capitalize">{meeting.meetingType} meeting</p>
      <p className="mt-2 text-slate-600">
        Conducting: {meeting.conducting}
      </p>

      <form action={deleteMeeting.bind(null, meeting.id)} className="mt-4">
        <button
          type="submit"
          aria-label={`Delete meeting on ${meeting.date}`}
          className="rounded-md border border-red-700 px-3 py-1 text-red-800"
        >
          Delete
        </button>
      </form>

    </article>
  );
}