import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import MeetingForm from '@/components/MeetingForm';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Sacrament Meeting</h1>
      <MeetingForm meeting={meeting} />
    </div>
  );
}