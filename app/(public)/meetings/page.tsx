import { Suspense } from 'react';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

export const dynamic = 'force-dynamic';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sacrament Meetings</h1>

      <Suspense fallback={<div className="h-10 w-full bg-slate-100 animate-pulse mb-6" />}>
        <MeetingSearch />
      </Suspense>

      <div className="space-y-4">
        {meetings.length > 0 ? (
          meetings.map((m) => <MeetingCard key={m.id} meeting={m} />)
        ) : (
          <p className="text-slate-500 py-8 text-center">No meetings found matching your criteria.</p>
        )}
      </div>

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </div>
  );
}