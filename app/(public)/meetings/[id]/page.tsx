import { notFound } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';
import MeetingDetail from '@/components/MeetingDetail';

async function fetchMeetingById(id: string): Promise<SacramentMeeting | null> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/meetings/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404 || res.status === 400) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch meeting: ${res.statusText}`);
  }

  return res.json();
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await fetchMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}