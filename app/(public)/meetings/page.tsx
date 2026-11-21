import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          All Meetings
        </h1>

        <p className="mt-2 text-slate-600">
          Select a meeting to view its full program.
        </p>

        <Link
          href="/meetings/new"
          className="mt-4 inline-block rounded-md bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          Create Meeting
        </Link>
      </div>

      <Suspense fallback={<p role="status">Loading meetings…</p>}>
        <MeetingsList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function MeetingsList({
  searchParams,
}: MeetingsPageProps) {
  await connection();

  const params = await searchParams;
  const query = params?.query ?? "";
  const requestedPage = Number(params?.page);

  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="space-y-6">
      <MeetingSearch />

      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {totalPages > 0 && <Pagination totalPages={totalPages} />}
    </div>
  );
}