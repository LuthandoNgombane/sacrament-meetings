import { Suspense } from "react";
import { connection } from "next/server";
import MeetingCard from "@/components/MeetingCard";
import { getApiUrl } from "@/lib/api-url";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          All Meetings
        </h1>

        <p className="mt-2 text-slate-600">
          Select a meeting to view its full program.
        </p>
      </div>

      <Suspense fallback={<p role="status">Loading meetings…</p>}>
        <MeetingsList />
      </Suspense>
    </section>
  );
}

async function MeetingsList() {
  await connection();

  const response = await fetch(getApiUrl("/api/meetings"), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load meetings.");
  }

  const meetings: SacramentMeeting[] = await response.json();

  if (meetings.length === 0) {
    return <p>No meetings are available.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}