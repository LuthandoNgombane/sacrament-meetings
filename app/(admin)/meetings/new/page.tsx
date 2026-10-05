import MeetingForm from '@/components/MeetingForm';

export default function CreateMeetingPage() {
  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create New Sacrament Meeting</h1>
      <MeetingForm />
    </div>
  );
}