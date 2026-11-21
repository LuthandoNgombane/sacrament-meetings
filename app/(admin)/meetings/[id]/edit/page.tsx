import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  return (
    <Suspense fallback={<p role="status">Loading meeting…</p>}>
      <EditMeetingContent params={params} />
    </Suspense>
  );
}

async function EditMeetingContent({ params }: EditMeetingPageProps) {
  const { id: rawId } = await params;
  if (!/^[1-9]\d*$/.test(rawId)) notFound();

  const id = Number(rawId);
  if (!Number.isSafeInteger(id)) notFound();

  const meeting = await getMeetingById(id);
  if (!meeting) notFound();

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-blue-900">Edit meeting</h1>
      <MeetingForm
        key={id}
        meeting={meeting}
        action={updateMeeting.bind(null, id)}
      />
    </section>
  );
}