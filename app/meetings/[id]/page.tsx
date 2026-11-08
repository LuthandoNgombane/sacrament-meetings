import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getApiUrl } from "@/lib/api-url";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <Suspense
      fallback={
        <p role="status" className="py-8 text-center">
          Loading meeting program…
        </p>
      }
    >
      <MeetingContent params={params} />
    </Suspense>
  );
}

async function MeetingContent({ params }: MeetingPageProps) {
  const { id } = await params;

  await connection();

  const response = await fetch(
    getApiUrl(`/api/meetings/${encodeURIComponent(id)}`),
    { cache: "no-store" }
  );

  if (response.status === 400 || response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Unable to load the meeting program.");
  }

  const meeting: SacramentMeeting = await response.json();

  return <MeetingDetail meeting={meeting} />;
}