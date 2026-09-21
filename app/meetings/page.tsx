import type { SacramentMeeting } from '@/lib/types';
import MeetingCard from '@/components/MeetingCard';

export const metadata = {
  title: 'All Meetings | Sacrament Meeting Planner',
};

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/meetings`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch sacrament meetings');
  }

  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Scheduled Services
        </h3>
        <p className="text-sm text-slate-500">
          Select a Sunday to view or print the full program.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}