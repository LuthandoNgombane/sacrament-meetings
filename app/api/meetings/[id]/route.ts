import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const meetingId = parseInt(id, 10);

  if (isNaN(meetingId)) {
    return NextResponse.json({ message: 'Invalid meeting ID' }, { status: 400 });
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json({ message: 'Meeting not found' }, { status: 404 });
  }

  return NextResponse.json(meeting);
}