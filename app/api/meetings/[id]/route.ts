import { getMeetingById } from "@/lib/meetings-db";

interface MeetingRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: MeetingRouteContext
): Promise<Response> {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return Response.json(
      { error: "Meeting ID must be a positive integer." },
      { status: 400 }
    );
  }

  const meetingId = Number(id);

  if (!Number.isSafeInteger(meetingId) || meetingId < 1) {
    return Response.json(
      { error: "Meeting ID must be a positive integer." },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return Response.json(
      { error: "Meeting not found." },
      { status: 404 }
    );
  }

  return Response.json(meeting, { status: 200 });
}