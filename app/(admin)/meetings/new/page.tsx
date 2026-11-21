import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-blue-900">Create meeting</h1>
      <MeetingForm action={createMeeting} />
    </section>
  );
}