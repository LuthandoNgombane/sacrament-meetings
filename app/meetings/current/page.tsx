import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

function getRecentSundayISO(): string {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function CurrentMeetingPage() {
  const recentSunday = getRecentSundayISO();
  const matchedMeetings = getMeetings(recentSunday);

  if (matchedMeetings.length > 0) {
    redirect(`/meetings/${matchedMeetings[0].id}`);
  }

  // Fallback: If no meeting matches the calculated Sunday, redirect to the first available meeting
  const allMeetings = getMeetings();
  if (allMeetings.length > 0) {
    redirect(`/meetings/${allMeetings[0].id}`);
  }

  redirect('/meetings');
}